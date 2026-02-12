import React from 'react';

interface OutputPanelProps {
  activeTab: 'xml' | 'markdown';
  onTabChange: (tab: 'xml' | 'markdown') => void;
  xmlOutput: string;
  markdownOutput: string;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  activeTab,
  onTabChange,
  xmlOutput,
  markdownOutput,
}) => {
  return (
    <div className="w-1/2 bg-slate-900 flex flex-col">
      <div className="flex h-10 border-b border-slate-800">
        <button
          onClick={() => onTabChange('markdown')}
          className={`flex-1 text-[10px] font-bold uppercase ${activeTab === 'markdown' ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-500' : 'text-slate-500'}`}>
          Markdown Document
        </button>
        <button
          onClick={() => onTabChange('xml')}
          className={`flex-1 text-[10px] font-bold uppercase ${activeTab === 'xml' ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-500' : 'text-slate-500'}`}>
          XML Output
        </button>
      </div>
      <div className="flex-1 overflow-auto p-8 mono text-xs leading-relaxed whitespace-pre scrollbar-thin">
        {activeTab === 'xml' ? (
          <div className="font-mono">
            {xmlOutput.split(/(<[^>]+>)/g).map((part, i) => {
              if (part.startsWith('<')) {
                // Tag color
                return (
                  <span key={i} className="text-sky-400">
                    {part}
                  </span>
                );
              }
              // Value color
              return (
                <span key={i} className="text-slate-200">
                  {part}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="text-slate-200 font-sans whitespace-pre-wrap">{markdownOutput}</div>
        )}
      </div>
    </div>
  );
};
