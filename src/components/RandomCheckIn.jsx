import React, { useState } from 'react';
import axios from 'axios';

const RandomCheckIn = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const ResponseEnumLabels = {
    0: "BadRequest",
    1: "ServerError",
    2: "Success",
    3: "NoChangesMade",
    4: "NoDataFound",
    5: "AlreadyExists"
  };

  const handleRandomCheckIn = async () => {
    setLoading(true);
    setResults([]);
    try {
      const res = await axios.post("https://localhost:7107/Parking/RandomCheckIn");
      if (res.data.response === 2) {
        setResults(res.data.data); 
      } else {
        alert("Error: " + (res.data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Failed to check in random vehicles.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Random Vehicle Check-In</h2>
      <button onClick={handleRandomCheckIn} disabled={loading}>
        {loading ? "Checking in" : "Generate & Check In 5 Random Vehicles"}
      </button>

      {results.length > 0 && (
        <table border="1" cellPadding="5" style={{ margin: "20px auto" }}>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Assigned Lot</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.licensePlate || `Vehicle ${i + 1}`}</td>
                <td>{ResponseEnumLabels[r.response]}</td>
                <td>{r.assignedLotNumber ?? "N/A"}</td>
                <td>{r.error || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RandomCheckIn
