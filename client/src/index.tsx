import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import {store} from './app/stores/store';
import App from './app/layout/App';
import NavBar from './app/layout/NavBar';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Trips from './features/trips/Trips';
import TripDetails from './features/trips/details/TripDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Trips />,
    errorElement: <Trips />,
  },
  {
    path: "/trips",
    element: <Trips />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
