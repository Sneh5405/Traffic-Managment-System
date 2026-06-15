import React from 'react';
import { TopAppBar, MapPanel, Sidebar } from './components';

function App() {
  return (
    <div className="bg-background text-on-surface selection:bg-primary-container selection:text-white">
      <TopAppBar />

      <main className="flex h-screen pt-[56px] overflow-hidden">
        <MapPanel />
        <Sidebar />
      </main>
    </div>
  );
}

export default App;
