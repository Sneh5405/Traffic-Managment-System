import React from 'react';

const getStatusLabel = (coConcentration) => {
    const value = Number(coConcentration);

    if (Number.isNaN(value)) {
        return { label: 'NO DATA', tone: 'bg-surface-variant text-on-surface-variant' };
    }
    if (value >= 300) return { label: 'CRITICAL', tone: 'bg-error text-on-error' };
    if (value >= 200) return { label: 'HIGH', tone: 'bg-warning text-on-warning' };
    return { label: 'NORMAL', tone: 'bg-success text-on-success' };
};

const SensorPopup = ({ street, sector, queueLength, coConcentration, lastUpdate }) => {
    const status = getStatusLabel(coConcentration);

    return (
        <div className="w-72 glass-popup bg-surface-container-high/90 p-4 rounded-2xl border border-outline-variant/30 shadow-2xl z-50">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-sm font-bold text-white">{street}</h3>
                    <p className="text-[10px] text-on-surface-variant font-medium">Sector: {sector}</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${status.tone}`}>{status.label}</span>
            </div>
            <div className="space-y-3">
                <div>
                    <p className="text-[8px] text-on-surface-variant uppercase tracking-tighter">Queue Length</p>
                    <p className="text-sm font-semibold text-white">{queueLength != null ? `${queueLength} m` : '—'}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                    <div className="flex items-center gap-2">
                        <span className="text-[8px] text-on-surface-variant uppercase tracking-tighter">CO Concentration</span>
                        <span className="text-xs font-bold text-tertiary">{coConcentration != null ? `${coConcentration} ppm` : '—'}</span>
                    </div>
                    <span className="text-[8px] text-on-surface-variant font-mono">Last Update: {lastUpdate}</span>
                </div>
            </div>
        </div>
    );
};

export default SensorPopup;