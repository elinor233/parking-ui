import React from 'react';
import './App.css';
import CheckInForm from './components/CheckInForm';
import CheckOutForm from './components/CheckOutForm';
import GarageStatus from './components/GarageStatus';
import ParkingLotStatus from './components/ParkingLotStatus';
import VehiclesByTicket from './components/VehiclesByTicket';
import RandomCheckIn from './components/RandomCheckIn';

function App() {
  return (
    <div className="container">
      <h1>Parking Garage System</h1>

      <div className="section">
        <CheckInForm />
      </div>

      <div className="section">
        <CheckOutForm />
      </div>

      <div className="section">
        <GarageStatus />
      </div>

      <div className="section">
        <ParkingLotStatus />
      </div>

      <div className="section">
        <VehiclesByTicket />
      </div>
      <div className="section">
        <RandomCheckIn />
      </div>
    </div>
  );
}


export default App;
