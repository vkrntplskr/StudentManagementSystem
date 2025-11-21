import { useState } from 'react';
import StudentService from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', city: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.fullName || !form.email || !form.mobile || !form.city) {
      alert('Please fill all fields');
      return false;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      alert('Mobile number must be 10 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await StudentService.create(form);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Add failed');
    }
  };

  return (
    <div className="card">
      <h3>Add Student</h3>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Mobile</label>
        <input name="mobile" value={form.mobile} onChange={handleChange} />

        <label>City</label>
        <input name="city" value={form.city} onChange={handleChange} />

        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  );
}
