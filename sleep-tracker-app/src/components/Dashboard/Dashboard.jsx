import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard({ setUserId }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserId(null);
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Your BPM is:</p>
      <p>You slept for:</p>
      <p>You have been awake for:</p>
      <button className="my-button" onClick={handleLogout}>Logout</button>
      <Link to="/profile">
        <button className="my-button">Edit Profile</button>
      </Link>
      {/*<Link to="/excel">
        <button className="my-button"> upload excel file</button>
      </Link>*/}
    </div>
  );
}
