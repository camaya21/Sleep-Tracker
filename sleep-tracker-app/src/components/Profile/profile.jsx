import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

export default function Profile() {
  return(
    <div>
      <h2>Profile</h2>
      <form>
        <label className="text-stuff">
            First Name:
            <input type="text" name="fname" />
            <br />
            Last Name:
            <input type="text" name="lname" />
            <br />
            Height:
            <input type="text" name="ft" /> ft
            <input type="text" name="in" /> in
            <br />
            Gender:
            <select>
                <option value="female">female</option>
                <option value="male">male</option>
            </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
}