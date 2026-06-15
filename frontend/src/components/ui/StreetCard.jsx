import React from 'react';

const StreetCard = ({ street, record }) => {
    const hasData = Boolean(record);

    return (
        <div className="group relative overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 shadow-sm transition-all hover:border-secondary/60 hover:bg-surface-container-high/80">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-white">{street}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.24em]">Hover for details</p>
                </div>
                {hasData && (
                    <span className="rounded-full bg-secondary-container/20 px-2 py-1 text-[10px] font-bold text-secondary">Live</span>
                )}
            </div>

            <div className="pointer-events-none mt-4 rounded-2xl border border-white/5 bg-surface/80 p-3 opacity-0 transition duration-200 group-hover:opacity-100">
                {hasData ? (
                    <>
                        <div className="mb-3">
                            <p className="text-[8px] uppercase tracking-[0.24em] text-on-surface-variant">Sector</p>
                            <p className="text-sm font-semibold text-white">{record.sector}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-[8px] uppercase tracking-[0.24em] text-on-surface-variant">Queue</p>
                                <p className="font-semibold text-white">{record.queueLength} m</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[0.24em] text-on-surface-variant">CO</p>
                                <p className="font-semibold text-tertiary">{record.coConcentration}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-16" />
                )}
            </div>
        </div>
    );
};

export default StreetCard;
