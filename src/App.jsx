// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Layout from './Layout.jsx';
// import Navbar from './Navbar';
// import Event from './pages/main/Main';
// import Agenda from './pages/agenda/Agenda';
// import FinancialPlanning from './pages/finacialPlanning/FinancialPlanning';
// import FoodTravel from './pages/foodAndTravel/FoodAndTravel';
// import InfraTech from './pages/infraTech/InfraTechSetup';
// import EventForm from './pages/main/Main';
// import Others from './pages/others/Others';
// import Login from './pages/login/Login';
// import FilterEvents from './pages/filterevents/FilterEvents';
// import { useLocation } from "react-router-dom";
// import EventNav from './EventNav';


// function App() {
//   const location = useLocation();
//   const hideNavbarPaths = ["/Login", "/FilterEvents"]; // paths where navbars should be hidden
//   const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
//   const showEventNav = location.pathname !== "/Login";

//   return (
//     <>
//       {/* Only render Navbar if the current path is not in hideNavbarPaths */}
//       {!shouldHideNavbar && <Navbar />}
      
//       {/* EventNav should only be hidden on /login */}
//       {/* {showEventNav && <Narbar />} */}

//       <div
//         style={{
//           width: '100%',
//           minHeight: '100vh',
//           background: 'white',
//           margin: 0,
//           padding: 0,
//           overflowX: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <div style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
//           <Routes>
//             <Route element={<Layout />}>
//               <Route path="/" element={<Event />} />
//               <Route path="/agenda" element={<Agenda />} />
//               <Route path="/financialPlanning" element={<FinancialPlanning />} />
//               <Route path="/infraTech" element={<InfraTech />} />
//               <Route path="/foodTravel" element={<FoodTravel />} />
//               <Route path="/checklist" element={<Others />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/filterEvents" element={<FilterEvents />} />
//               <Route path="*" element={<EventForm />} />
//             </Route>
//           </Routes>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

// function App() {
//   const location = useLocation();
  
//   // Hide BOTH navbars on these paths
//   const hideBothNavsPaths = ["/login"];
//   // Hide ONLY EventNav on these paths
//   const hideEventNavPaths = ["/filterEvents"];

//   const shouldHideBothNavs = hideBothNavsPaths.includes(location.pathname);
//   const shouldHideEventNav = hideEventNavPaths.includes(location.pathname) || shouldHideBothNavs;

//   return (
//     <>
//       {/* Show Navbar unless we're on a hideBothNavs path */}
//       {!shouldHideBothNavs && <Navbar />}
      
//       {/* Show EventNav unless we're on a hideEventNav path */}
//       {!shouldHideEventNav && <EventNav />}

//       <div
//         style={{
//           width: '100%',
//           minHeight: '100vh',
//           background: 'white',
//           margin: 0,
//           padding: 0,
//           overflowX: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <div style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
//           <Routes>
//             <Route element={<Layout />}>
//               <Route path="/" element={<Event />} />
//               <Route path="/agenda" element={<Agenda />} />
//               <Route path="/financialPlanning" element={<FinancialPlanning />} />
//               <Route path="/infraTech" element={<InfraTech />} />
//               <Route path="/foodTravel" element={<FoodTravel />} />
//               <Route path="/checklist" element={<Others />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/filterEvents" element={<FilterEvents />} />
//               <Route path="*" element={<EventForm />} />
//             </Route>
//           </Routes>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout.jsx';
import Navbar from './Navbar';
import Event from './pages/main/Main';
import Agenda from './pages/agenda/Agenda';
import FinancialPlanning from './pages/finacialPlanning/FinancialPlanning';
import FoodTravel from './pages/foodAndTravel/FoodAndTravel';
import InfraTech from './pages/infraTech/InfraTechSetup';
import EventForm from './pages/main/Main';
import Others from './pages/others/Others';
import Login from './pages/login/Login';
import FilterEvents from './pages/filterevents/FilterEvents';
import Inbox from './pages/inbox/Inbox';
import EventNav from './EventNav';

function App() {
  const location = useLocation();
  
  // Paths where both navbars should be hidden
  const hideAllNavsPaths = ["/", "/login", "/signup"];
  // Paths where only EventNav should be hidden
  const hideEventNavPaths = ["/FilterEvents"];

  // Check if current path requires hiding navbars
  const shouldHideAllNavs = hideAllNavsPaths.some(path => 
    location.pathname === path
  );
  const shouldHideEventNav = hideEventNavPaths.some(path => 
    location.pathname === path
  );

  return (
    <>
      {/* Main Navbar - hidden only on login/signup pages */}
      {!shouldHideAllNavs && <Navbar />}
      
      {/* Event Navbar - hidden on FilterEvents and login pages */}
      {!shouldHideAllNavs && !shouldHideEventNav && <EventNav />}

      {/* Main content area */}
      <div style={{
        width: '100%',
        minHeight: '100vh',
        background: 'white',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          padding: '20px' 
        }}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/event" element={<Event />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/financialPlanning" element={<FinancialPlanning />} />
              <Route path="/infraTech" element={<InfraTech />} />
              <Route path="/foodTravel" element={<FoodTravel />} />
              <Route path="/checklist" element={<Others />} />
              <Route path="/filterEvents" element={<FilterEvents />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="*" element={<EventForm />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
