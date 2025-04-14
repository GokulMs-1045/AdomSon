import React from 'react';
import { Route, Routes } from 'react-router-dom';

import EventNav from './EventNav';
import Navbar from './Navbar';

import Agenda from './pages/agenda/Agenda';
import FinancialPlanning from './pages/finacialPlanning/FinancialPlanning';
import FoodTravel from './pages/foodAndTravel/FoodAndTravel';
import InfraTech from './pages/infraTech/InfraTechSetup';
import EventForm from './pages/main/Main';
import Others from './pages/others/Others';


function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#f0f2f5',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Navbar />
      <EventNav />

      <div style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
        <Routes>
          <Route path="/event" element={<EventForm />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/financialPlanning" element={<FinancialPlanning />} />
          <Route path="/infraTech" element={<InfraTech />} />
          <Route path="/foodTravel" element={<FoodTravel />} />
          <Route path="/checklist" element={<Others />} />
          {/* <Route path="/profile" element={<FacultyCard />} /> */}
          <Route path="*" element={<EventForm />} /> {/* fallback */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
