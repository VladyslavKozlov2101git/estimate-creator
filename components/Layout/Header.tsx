import React from 'react';

interface HeaderProps {
  activeTab: 'xml' | 'markdown';
  onCopy: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onCopy }) => {
  return (
    <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">
          E
        </div>
        <h1 className="font-bold tracking-tight">
          Estimate Creator <span className="text-slate-500 text-xs ml-2 uppercase">v2.0</span>
        </h1>
      </div>
      <button
        onClick={onCopy}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded text-xs font-bold transition-all">
        COPY {activeTab.toUpperCase()}
      </button>
    </header>
  );
};
