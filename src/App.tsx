import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import HealthLogs from './pages/HealthLogs';
import MedicationTracker from './pages/MedicationTracker';
import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'caregiver'>('patient');

  // In a real app, we would determine the user role from authentication
  const toggleUserRole = () => {
    setUserRole(userRole === 'patient' ? 'doctor' : 'patient');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header>
        <Navbar userRole={userRole} />
      </header>
      
      <main className="flex-1">
        <Routes>
          {userRole === 'patient' ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/health-logs" element={<HealthLogs />} />
              <Route path="/medications" element={<MedicationTracker />} />
            </>
          ) : (
            <>
              <Route path="/" element={<DoctorDashboard />} />
              <Route path="/patients" element={<div>Patients Page</div>} />
            </>
          )}
          <Route path="/appointments" element={<div>Appointments Page</div>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2025 RecoveryTrack. All rights reserved.
            </div>
            <div>
              <button 
                className="text-sm text-primary-600 hover:text-primary-500"
                onClick={toggleUserRole}
              >
                Switch to {userRole === 'patient' ? 'Doctor' : 'Patient'} View
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;