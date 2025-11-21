import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav">
    <h2>Student Management</h2>
    <div>
      <Link to="/" className="btn">Home</Link>
      <Link to="/add" className="btn">Add Student</Link>
    </div>
  </nav>
);

export default Navbar;
