import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    age: '',
    weight: '',
  });

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/users/${userId}`)
      .then((res) => {
        const u = res.data;
        setForm({
          first_name: u.first_name || '',
          last_name: u.last_name || '',
          gender: u.gender || '',
          age: u.age ?? '',
          weight: u.weight ?? '',
        });
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('No userId found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/users/${userId}`, {
        first_name: form.first_name,
        last_name: form.last_name,
        gender: form.gender,
        age: form.age === '' ? null : Number(form.age),
        weight: form.weight === '' ? null : Number(form.weight),
      });

      alert('Profile saved!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to save profile.');
    }
  };

  return (
    <div>
      <h2>Profile</h2>

      <form onSubmit={handleSubmit}>
        <label className="text-stuff">
          First Name:
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          />
          <br />

          Last Name:
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />
          <br />

          Age:
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
          <br />

          Weight:
          <input
            type="number"
            step="0.1"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
          <br />

          Gender:
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="non-binary">nonbinary</option>
            <option value="choose not to answer">choose not to answer</option>
          </select>
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>

      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
}