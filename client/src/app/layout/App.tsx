import React from 'react';
import './App.css';
import Trips from '../../features/trips/Trips';
import CommonModal from '../shared/CommonModal';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container">
      <ToastContainer position='bottom-right' hideProgressBar />
      <CommonModal />
      <Trips />
    </div>
  );
}

export default App;
