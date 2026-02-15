import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    gender: 'female',
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
          gender: u.gender || 'female',
          age: u.age ?? '',
          weight: u.weight ?? '',
        });
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      alert('Failed to save profile.');
    }
  };

  return (
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
