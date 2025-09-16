import React, { useState } from 'react';
import axios from 'axios';

const CheckOutForm = () => {
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://localhost:7107/Parking/checkOut?licensePlate=${licensePlate}`
      );
      const response = res.data;

      switch (response.response) {
        case 2: // Success
          alert("Vehicle checked out successfully.");
          break;
        case 4: // NoDataFound
          alert("Vehicle not found or already checked out.");
          break;
        case 0: // BadRequest
          alert("Check-out failed: " + (response.error || "Invalid request."));
          break;
        default:
          alert("Unknown server response.");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.title || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Vehicle Check-Out</h2>
      <input
        type="text"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        placeholder="License Plate"
        required
      />
      <button type="submit">Check Out</button>
    </form>
  );
};

export default CheckOutForm;
