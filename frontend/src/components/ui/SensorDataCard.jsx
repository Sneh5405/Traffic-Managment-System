import React from 'react';

const SensorDataCard = ({ street, sector, queueLength, coConcentration, createdAt }) => {
    const timeString = new Date(createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{street}</p>
                    <p className="text-[10px] text-on-surface-variant">{sector}</p>
                </div>
                <span className="text-[10px] font-semibold text-on-surface-variant">{timeString}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <p className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant">Queue Length</p>
                    <p className="text-white font-semibold">{queueLength} m</p>
                </div>
                <div>
                    <p className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant">CO Concentration</p>
                    <p className="text-tertiary font-semibold">{coConcentration}</p>
                </div>
            </div>
        </div>
    );
};

export default SensorDataCard;
