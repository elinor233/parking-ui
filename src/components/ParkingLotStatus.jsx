import React, { useState } from 'react';
import axios from 'axios';

const ParkingLotStatus = () => {
    const [lotId, setLotId] = useState('');
    const [lotData, setLotData] = useState(null);
    const [error, setError] = useState('');

    const TicketTypeLabels = {
        1: "VIP",
        2: "Value",
        3: "Regular"
    };


    const fetchLot = async () => {
        try {
            const res = await axios.get(`https://localhost:7107/Parking/GetLotState?parkingLotId=${lotId}`);
            if (res.data.response === 2) {
                setLotData(res.data.data);
                setError('');
            } else {
                setError(res.data.error || "Lot not found.");
                setLotData(null);
            }
        } catch (err) {
            setError("Error fetching lot state.");
            setLotData(null);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h2>Check Specific Parking Lot</h2>
            <input
                type="number"
                placeholder="Enter Lot ID"
                value={lotId}
                onChange={(e) => setLotId(e.target.value)}
            />
            <button onClick={fetchLot}>Check Lot</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {lotData && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Lot #{lotId} Info:</h3>
                    <p><strong>Occupied:</strong> {lotData.isOccupied ? "Yes" : "No"}</p>
                    <p><strong>Vehicle ID:</strong> {lotData.vehicleId ?? "N/A"}</p>
                    <p><strong>Ticket Type:</strong> {TicketTypeLabels[lotData.ticketTypeId] ?? "N/A"}</p>
                </div>
            )}
        </div>
    );
};

export default ParkingLotStatus;
