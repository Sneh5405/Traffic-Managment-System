import React from 'react';

const TopAppBar = () => {
    return (
        <header className="fixed top-0 w-full h-[56px] flex justify-between items-center px-6 z-[100] bg-surface/70 backdrop-blur-xl dark:bg-[#131318]/70 shadow-[0_4px_24px_rgba(191,90,242,0.06)]">
            <div className="flex items-center gap-8">
                <nav className="hidden md:flex items-center gap-6 text-sm font-['Inter'] tracking-tighter">
                    <a className="text-white border-b-2 border-[#BF5AF2] pb-1" href="#">Live</a>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <button className="hover:bg-white/5 transition-all p-2 rounded-full scale-95 active:scale-90 flex items-center text-on-surface">
                    <span className="material-symbols-outlined" data-icon="settings">settings</span>
                </button>
            </div>
        </header>
    );
};

export default TopAppBar;