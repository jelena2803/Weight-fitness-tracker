import React from 'react';
import './index.css';

function Navbar() {
    return (
        <nav>
        <ul>
          <li className="menu-left">Weight and Fitness Tracker</li>
          <span className="menu-right">
            <li>Profile</li>
            <li>Weight</li>
            <li>Fitness</li>
            <li>Nutrition</li>
            <li>Log in</li>
          </span>
        </ul>
      </nav>
    );
}

export default Navbar;