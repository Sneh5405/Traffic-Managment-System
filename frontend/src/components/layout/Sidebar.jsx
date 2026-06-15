import React, { useState } from 'react';
import SectorCard from '../ui/SectorCard';
import SensorFeed from './SensorFeed';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="fixed right-4 top-[72px] z-[110] bg-surface-container-high/90 backdrop-blur-lg border border-outline-variant/30 p-2 rounded-full shadow-lg hover:bg-surface-container-high transition-all"
            >
                <span className="material-symbols-outlined text-on-surface">
                    {isOpen ? 'chevron_right' : 'chevron_left'}
                </span>
            </button>

            {/* Sidebar */}
            <aside className={`fixed right-0 top-[56px] bg-[#1B1B20]/80 backdrop-blur-lg flex flex-col p-6 space-y-8 overflow-y-auto z-40 h-[calc(100vh-56px)] transition-all duration-300 ${isOpen ? 'w-[40%]' : 'w-0 overflow-hidden'
                }`}>
                {/* City Overview */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-['Inter'] text-sm font-semibold uppercase tracking-widest text-[#D2C1D4]">City Overview</h2>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-secondary-fixed bg-secondary-container/20 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                            LIVE STREAMING
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-surface-container-high rounded-xl border border-outline-variant/5">
                            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">Active Nodes</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-thin text-white tracking-tighter">18</span>
                                <span className="text-sm text-on-surface-variant">/ 30</span>
                            </div>
                        </div>
                        <div className="p-4 bg-surface-container-high rounded-xl border border-outline-variant/5">
                            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">CO Concentration</p>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-thin text-tertiary tracking-tighter">72</span>
                                <span className="text-[10px] font-bold text-tertiary">MOD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sector Summary */}
                <div className="space-y-4">
                    <h2 className="font-['Inter'] text-sm font-semibold uppercase tracking-widest text-[#D2C1D4]">Sector Summary</h2>
                    <div className="grid grid-cols-1 gap-2">
                        <SectorCard
                            sectorNumber={1}
                            sectorName="North"
                            trafficStatus="High"
                            trafficColor="#FF453A"
                            pollutionLevel="142"
                            pollutionColor="#FFB868"
                        />
                        <SectorCard
                            sectorNumber={2}
                            sectorName="West"
                            trafficStatus="Mod"
                            trafficColor="#FFB868"
                            pollutionLevel="48"
                            pollutionColor="#47E266"
                        />
                        <SectorCard
                            sectorNumber={3}
                            sectorName="Central"
                            trafficStatus="Low"
                            trafficColor="#47E266"
                            pollutionLevel="86"
                            pollutionColor="#FFB868"
                        />
                        <SectorCard
                            sectorNumber={4}
                            sectorName="South"
                            trafficStatus="Mod"
                            trafficColor="#FFB868"
                            pollutionLevel="198"
                            pollutionColor="#FF453A"
                        />
                    </div>
                </div>

                <SensorFeed />
            </aside>
        </>
    );
};

export default Sidebar;