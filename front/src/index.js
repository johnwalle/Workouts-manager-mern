import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './contexts/WorkoutContext'
import { AuthContextProvider } from "./contexts/AuthContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WorkoutsContextProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </WorkoutsContextProvider>
);

