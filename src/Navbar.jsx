import React, { useState } from 'react';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [selected, setSelected] = useState('create'); // default selected

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">Logo</span>
      </div>

      <div className="navbar-center">
        <button
          className={`nav-option ${selected === 'create' ? 'selected' : ''}`}
          onClick={() => setSelected('create')}
        >
          Create Event
        </button>
        <span
          className={`nav-option ${selected === 'generation' ? 'selected' : ''}`}
          onClick={() => setSelected('generation')}
        >
          Report Generation
        </span>
        <span
          className={`nav-option ${selected === 'report' ? 'selected' : ''}`}
          onClick={() => setSelected('report')}
        >
          Report
        </span>
      </div>

      <div className="navbar-right">
        <FaUserCircle className="user-icon" />
        <span className="username">
          Tom <span className="dropdown-arrow">▼</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
