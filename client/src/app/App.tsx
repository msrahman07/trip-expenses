import React from 'react';
import './App.css';
import Trips from '../features/trips/Trips';
import SignupForm from '../features/account/SignupForm';
import LoginForm from '../features/account/LoginForm';
import CreateTrip from '../features/trips/CreateTrip';

function App() {
  return (
    <div className="container">
      <SignupForm />
      <LoginForm />
      <CreateTrip />
      <Trips />
    </div>
  );
}

export default App;
