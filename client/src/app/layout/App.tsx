import React from 'react';
import './App.css';
import Trips from '../../features/trips/Trips';
import CommonModal from '../shared/CommonModal';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';

function App() {
  return (
    <>
      <NavBar />

      <div className="container">
        <ToastContainer position='bottom-right' hideProgressBar />
        <CommonModal />
      </div>
    </>

  );
}

export default App;
