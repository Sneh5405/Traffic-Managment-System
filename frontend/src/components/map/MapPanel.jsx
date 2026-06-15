import React, { useEffect, useState } from 'react';
import SensorPopup from './SensorPopup';

const streetPaths = [
    {
        name: 'Street A',
        d: 'M0 300 L300 300',
        stroke: '#FF453A',
        hoverPos: { top: '22%', left: '24%' },
    },
    {
        name: 'Street B',
        d: 'M300 300 L700 300',
        stroke: '#FF9F0A',
        hoverPos: { top: '22%', left: '50%' },
    },
    {
        name: 'Street C',
        d: 'M300 0 L300 300',
        stroke: '#30D158',
        hoverPos: { top: '10%', left: '33%' },
    },
    {
        name: 'Street D',
        d: 'M0 700 L1000 700',
        stroke: '#FFD60A',
        hoverPos: { top: '62%', left: '50%' },
    },
    {
        name: 'Street E',
        d: 'M700 0 L700 1000',
        stroke: '#30D158',
        hoverPos: { top: '24%', left: '74%' },
    },
];

const MapPanel = () => {
    const [sensorData, setSensorData] = useState([]);
    const [hoverData, setHoverData] = useState({ street: null, position: null });

    useEffect(() => {
        const loadSensorData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/sensor-data');
                if (!response.ok) {
                    throw new Error('Unable to fetch sensor data');
                }

                const data = await response.json();
                setSensorData(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadSensorData();
    }, []);

    const latestRecords = sensorData.reduce((acc, record) => {
        if (!acc[record.street] || new Date(record.createdAt) > new Date(acc[record.street].createdAt)) {
            acc[record.street] = record;
        }
        return acc;
    }, {});

    const handleHover = (street, position) => {
        setHoverData({ street, position });
    };

    const clearHover = () => {
        setHoverData({ street: null, position: null });
    };

    const hoveredRecord = hoverData.street ? latestRecords[hoverData.street] : null;
    const popupRecord = hoveredRecord || {
        street: hoverData.street,
        sector: 'Unknown',
        queueLength: null,
        coConcentration: null,
        lastUpdate: 'No data yet',
    };

    return (
        <section className="relative w-full md:w-[60%] h-full map-grid-bg overflow-hidden">
            {/* Grid-like Road Network SVG */}
            <div className="absolute inset-0">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    {/* Base Road Layer (Dark Gray Lines) */}
                    <g fill="none" stroke="#1F1F25" strokeLinecap="round" strokeWidth="20">
                        <path d="M0 300 L1000 300"></path> {/* Street A-B horizontal axis */}
                        <path d="M0 700 L1000 700"></path> {/* Street D horizontal axis */}
                        <path d="M300 0 L300 1000"></path> {/* Street C vertical axis */}
                        <path d="M700 0 L700 1000"></path> {/* Street E vertical axis */}
                    </g>
                    {/* Traffic Polylines Overlay */}
                    <g fill="none" strokeLinecap="round" strokeWidth="12">
                        {streetPaths.map((street) => (
                            <React.Fragment key={street.name}>
                                <path
                                    d={street.d}
                                    stroke="rgba(255,255,255,0.01)"
                                    strokeWidth="32"
                                    pointerEvents="stroke"
                                    onPointerEnter={() => handleHover(street.name, street.hoverPos)}
                                    onPointerLeave={clearHover}
                                />
                                <path
                                    d={street.d}
                                    stroke={street.stroke}
                                    pointerEvents="none"
                                    className="cursor-pointer transition-all hover:stroke-[16px] hover:opacity-80"
                                />
                            </React.Fragment>
                        ))}
                    </g>
                    {/* Road Labels */}
                    <g className="text-sm font-black fill-on-surface/40 uppercase tracking-widest">
                        <text x="50" y="285">Street A</text>
                        <text x="450" y="285">Street B</text>
                        <text transform="rotate(90, 315, 50)" x="315" y="50">Street C</text>
                        <text x="50" y="685">Street D</text>
                        <text transform="rotate(90, 715, 50)" x="715" y="50">Street E</text>
                    </g>
                </svg>
            </div>
            {/* Sector Labels */}
            <div className="absolute inset-0 pointer-events-none">
                <span className="absolute top-[15%] left-[15%] text-[10px] font-black tracking-[0.2em] text-on-surface/20 uppercase">Sector 1</span>
                <span className="absolute top-[15%] right-[15%] text-[10px] font-black tracking-[0.2em] text-on-surface/20 uppercase">Sector 2</span>
                <span className="absolute bottom-[15%] left-[15%] text-[10px] font-black tracking-[0.2em] text-on-surface/20 uppercase">Sector 3</span>
                <span className="absolute bottom-[15%] right-[15%] text-[10px] font-black tracking-[0.2em] text-on-surface/20 uppercase">Sector 4</span>
            </div>
            {/* Sensor Nodes sitting on roads */}
            <div className="absolute inset-0">
                {/* S-01 (On Street A - Red) */}
                <div className="absolute top-[30%] left-[15%] -translate-y-1/2 -translate-x-1/2 group">
                    <div className="w-3.5 h-3.5 bg-[#FF453A] rounded-full sensor-pulse-red border-2 border-white/40"></div>
                </div>
                {/* S-04 (Intersection Street B x C) */}
                <div className="absolute top-[30%] left-[30%] -translate-y-1/2 -translate-x-1/2">
                    <div className="w-3.5 h-3.5 bg-[#FF453A] rounded-full sensor-pulse-red border-2 border-white/40"></div>
                </div>
                {/* S-02 (On Street B - Orange) */}
                <div className="absolute top-[30%] left-[50%] -translate-y-1/2 -translate-x-1/2">
                    <div className="w-3 h-3 bg-[#FF9F0A] rounded-full border-2 border-white/20"></div>
                </div>
                {/* S-05 (On Street D - Yellow) */}
                <div className="absolute top-[70%] left-[30%] -translate-y-1/2 -translate-x-1/2">
                    <div className="w-3 h-3 bg-[#FFD60A] rounded-full border-2 border-white/20"></div>
                </div>
                {/* S-03 (On Street E - Green) */}
                <div className="absolute top-[70%] left-[70%] -translate-y-1/2 -translate-x-1/2">
                    <div className="w-3 h-3 bg-[#30D158] rounded-full border-2 border-white/20"></div>
                </div>
            </div>

            {hoverData.street && hoverData.position && (
                <div
                    className="absolute min-w-[220px] max-w-sm p-2"
                    style={{
                        top: hoverData.position.top,
                        left: hoverData.position.left,
                        transform: 'translate(-50%, 0)',
                    }}
                >
                    <SensorPopup
                        street={popupRecord.street}
                        sector={popupRecord.sector}
                        queueLength={popupRecord.queueLength}
                        coConcentration={popupRecord.coConcentration}
                        lastUpdate={popupRecord.lastUpdate}
                    />
                </div>
            )}
            {/* Map Controls */}
        </section>
    );
};

export default MapPanel;