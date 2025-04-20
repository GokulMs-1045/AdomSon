import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get initial tab based on URL path or localStorage
  const getInitialTab = () => {
    const path = location.pathname;
    if (path === '/FilterEvents') return 'generation';
    if (path === '/') return 'create';
    return localStorage.getItem('selectedTab') || 'create';
  };

  const [selected, setSelected] = useState(getInitialTab());

  useEffect(() => {
    localStorage.setItem('selectedTab', selected);
  }, [selected]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">Logo</span>
      </div>

      <div className="navbar-center">
        <button
          className={`nav-option ${selected === 'create' ? 'selected' : ''}`}
          onClick={() => {
            setSelected('create');
            navigate('/');
          }}
        >
          Create Event
        </button>

        <span
          className={`nav-option ${selected === 'generation' ? 'selected' : ''}`}
          onClick={() => {
            setSelected('generation');
            navigate('/FilterEvents');
          }}
        >
          Report Generation
        </span>

        <span
          className={`nav-option ${selected === 'report' ? 'selected' : ''}`}
          onClick={() => {
            setSelected('report');
            // navigate('/some-report-path');
          }}
        >
          Report
        </span>
      </div>

      <div className="navbar-right">
        <FaUserCircle className="user-icon" />
        <span className="username">
          Mr.K <span className="dropdown-arrow">▼</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
