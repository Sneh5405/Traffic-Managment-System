import React from 'react';

const SectorCard = ({ sectorNumber, sectorName, trafficStatus, trafficColor, pollutionLevel, pollutionColor }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
            <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white">Sector {sectorNumber}</span>
                <span className="text-[9px] text-on-surface-variant uppercase tracking-widest bg-surface-container-highest px-2 py-0.5 rounded">{sectorName}</span>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-on-surface-variant uppercase tracking-tighter font-bold">Traffic</span>
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: trafficColor }}></div>
                    <span className={`text-[10px] font-bold`} style={{ color: trafficColor }}>{trafficStatus}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-on-surface-variant uppercase tracking-tighter font-bold">Pollution</span>
                    <span className={`text-xs font-bold`} style={{ color: pollutionColor }}>{pollutionLevel}</span>
                </div>
            </div>
        </div>
    );
};

export default SectorCard;