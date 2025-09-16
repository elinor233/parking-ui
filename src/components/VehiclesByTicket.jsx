import React, { useState } from 'react';
import axios from 'axios';

const VehiclesByTicket = () => {
    const [ticketTypeId, setTicketTypeId] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState('');

    const TicketTypeLabels = {
        1: "VIP",
        2: "Value",
        3: "Regular"
    };
    const VehicleTypeLabels = {
        1: "Motorcycle",
        2: "Private",
        3: "Crossover",
        4: "SUV",
        5: "Van",
        6: "Truck"
    };


    const fetchVehicles = async () => {
        try {
            const res = await axios.get(`https://localhost:7107/Parking/vehiclesByTicket?ticketTypeId=${ticketTypeId}`);
            if (res.data.response === 2) {
                setVehicles(res.data.data);
                setError('');
            } else {
                setError(res.data.error || "No vehicles found.");
                setVehicles([]);
            }
        } catch (err) {
            setError("Error fetching vehicles.");
            setVehicles([]);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h2>Vehicles by Ticket Type</h2>
            <select onChange={(e) => setTicketTypeId(e.target.value)} value={ticketTypeId}>
                <option value="">Select Ticket Type</option>
                <option value="1">VIP</option>
                <option value="2">Value</option>
                <option value="3">Regular</option>
            </select>
            <button onClick={fetchVehicles} disabled={!ticketTypeId}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {vehicles.length > 0 && (
                <table border="1" cellPadding="5" style={{ margin: '20px auto' }}>
                    <thead>
                        <tr>
                            <th>Vehicle ID</th>
                            <th>License Plate</th>
                            <th>Vehicle Type</th>
                            <th>Check-In Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((v) => (
                            <tr key={v.vehicleId}>
                                <td>{v.vehicleId}</td>
                                <td>{v.licensePlate}</td>
                                <td>{VehicleTypeLabels[v.vehicleTypeId] ?? "N/A"}</td>
                                <td>{v.checkInTime ? new Date(v.checkInTime).toLocaleString() : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VehiclesByTicket;
