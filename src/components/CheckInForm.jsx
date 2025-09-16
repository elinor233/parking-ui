import React, { useState } from 'react';
import axios from 'axios';

const CheckInForm = () => {
  const [form, setForm] = useState({
    name: '',
    licensePlate: '',
    phone: '',
    vehicleTypeId: '',
    height: '',
    width: '',
    length: '',
    ticketTypeId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["vehicleTypeId", "ticketTypeId", "height", "width", "length"];

    setForm({
      ...form,
      [name]: numericFields.includes(name) ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7107/Parking/checkIn', form);
      const response = res.data;
      switch (response.response) {
        case 2: // Success
          alert("Vehicle checked in! Lot assigned: " + response.data.assignedLotNumber);
          break;
        case 5: // AlreadyExists
          alert("Vehicle already checked in.");
          break;
        case 4: // NoDataFound
          alert("No parking space available.");
          break;
        case 0: // BadRequest
          alert("Check-in failed: " + (response.error || "Invalid request."));
          break;
        default:
          alert("Unknown server response.");
      }


    } catch (error) {
      alert('Error: ' + (error.response?.data?.title || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Vehicle Check-In</h2>

      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="licensePlate" placeholder="License Plate" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />

      <select name="ticketTypeId" onChange={handleChange} required>
        <option value="">Select Ticket</option>
        <option value="1">VIP</option>
        <option value="2">Value</option>
        <option value="3">Regular</option>
      </select>

      <select name="vehicleTypeId" onChange={handleChange} required>
        <option value="">Select Vehicle</option>
        <option value="1">Motorcycle</option>
        <option value="2">Private</option>
        <option value="3">Crossover</option>
        <option value="4">SUV</option>
        <option value="5">Van</option>
        <option value="6">Truck</option>
      </select>

      <input type="number" name="height" placeholder="Height" onChange={handleChange} required />
      <input type="number" name="width" placeholder="Width" onChange={handleChange} required />
      <input type="number" name="length" placeholder="Length" onChange={handleChange} required />

      <button type="submit">Check In</button>
    </form>
  );
};

export default CheckInForm;
