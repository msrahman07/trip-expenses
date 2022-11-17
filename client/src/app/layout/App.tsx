import React from 'react';
import './App.css';
import Trips from '../../features/trips/Trips';
import CommonModal from '../shared/CommonModal';

function App() {
  return (
    <div className="container">
      <CommonModal />
      <Trips />
    </div>
  );
}

export default App;
