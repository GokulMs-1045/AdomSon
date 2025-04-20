import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import Navbar from './Navbar';
import Event from './pages/main/Main';
import Agenda from './pages/agenda/Agenda';
import FinancialPlanning from './pages/finacialPlanning/FinancialPlanning';
import FoodTravel from './pages/foodAndTravel/FoodAndTravel';
import InfraTech from './pages/infraTech/InfraTechSetup';
import EventForm from './pages/main/Main';
import Others from './pages/others/Others';
import FilterEvents from './pages/filterevents/FilterEvents';

function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'white',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Navbar />

      <div style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Event />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/financialPlanning" element={<FinancialPlanning />} />
            <Route path="/infraTech" element={<InfraTech />} />
            <Route path="/foodTravel" element={<FoodTravel />} />
            <Route path="/checklist" element={<Others />} />
            <Route path="/FilterEvents" element={<FilterEvents />} />
            <Route path="*" element={<EventForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
