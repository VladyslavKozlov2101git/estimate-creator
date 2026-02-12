import React from 'react';
import { useEstimate } from './hooks/useEstimate';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { FormPanel } from './components/Form/FormPanel';
import { OutputPanel } from './components/Output/OutputPanel';

const App: React.FC = () => {
  const {
    data,
    activeTab,
    setActiveTab,
    tempStory,
    setTempStory,
    tempRole,
    setTempRole,
    tempTech,
    setTempTech,
    updateField,
    toggleArrayItem,
    addItem,
    removeItem,
    fullXmlOutput,
    fullMarkdownOutput,
    copy,
  } = useEstimate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header activeTab={activeTab} onCopy={copy} />

      <main className="flex-1 flex overflow-hidden">
        <FormPanel
          data={data}
          tempRole={tempRole}
          setTempRole={setTempRole}
          tempStory={tempStory}
          setTempStory={setTempStory}
          tempTech={tempTech}
          setTempTech={setTempTech}
          updateField={updateField}
          toggleArrayItem={toggleArrayItem}
          addItem={addItem}
          removeItem={removeItem}
        />

        <OutputPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          xmlOutput={fullXmlOutput}
          markdownOutput={fullMarkdownOutput}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
