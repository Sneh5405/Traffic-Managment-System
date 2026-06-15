import React, { useEffect, useState } from 'react';

const SensorFeed = () => {
    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(err.message);
            } finally {
                setLoading(false);
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

    const records = Object.values(latestRecords).sort((a, b) => a.street.localeCompare(b.street));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="font-['Inter'] text-sm font-semibold uppercase tracking-widest text-[#D2C1D4]">Live Sensor Feed</h2>
                <span className="text-[10px] text-on-surface-variant">{loading ? 'Loading...' : `${records.length} streets`}</span>
            </div>

            {error && <p className="text-[10px] text-error">{error}</p>}

            {!loading && records.length === 0 && (
                <p className="text-[10px] text-on-surface-variant">No sensor data available yet.</p>
            )}

            <div className="grid gap-2">
                {records.map((record) => (
                    <div key={record.id} className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-white">{record.street}</p>
                                <p className="text-[10px] text-on-surface-variant">{record.sector}</p>
                            </div>
                            <p className="text-[10px] text-on-surface-variant">{new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-on-surface-variant">
                            <div>
                                <p className="text-[8px] uppercase tracking-[0.24em]">Queue Length</p>
                                <p className="text-white font-semibold">{record.queueLength} m</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[0.24em]">CO Concentration</p>
                                <p className="text-tertiary font-semibold">{record.coConcentration}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SensorFeed;
