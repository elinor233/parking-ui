import React, { useState } from 'react';
import axios from 'axios';
import './GarageStatus.css'; // נוסיף קובץ עיצוב חיצוני

const GarageStatus = () => {
  const [lots, setLots] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchGarage = async () => {
    try {
      const res = await axios.get('https://localhost:7107/Parking/GetGarageState');
      if (res.data.response === 2) {
        setLots(res.data.data);
        setShowTable(true); // הצגת הטבלה רק אחרי שליפת נתונים
      } else {
        alert("Failed to fetch garage data: " + res.data.error);
      }
    } catch (error) {
      console.error("Error fetching garage status:", error);
      alert("Error fetching garage state.");
    }
  };

  return (
    <div className="garage-container">
      <h2>Garage Status</h2>
      <button onClick={fetchGarage}>Show Garage Status</button>

      {showTable && (
        <table className="garage-table">
          <thead>
            <tr>
              <th>Lot ID</th>
              <th>Ticket Type</th>
              <th>Occupied</th>
              <th>Vehicle ID</th>
            </tr>
          </thead>
          <tbody>
            {lots.map((lot) => (
              <tr key={lot.parkingLotId}>
                <td>{lot.parkingLotId}</td>
                <td>{lot.ticketTypeId}</td>
                <td>{lot.isOccupied ? "Yes" : "No"}</td>
                <td>{lot.isOccupied ? lot.vehicleId : "Empty"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GarageStatus;
