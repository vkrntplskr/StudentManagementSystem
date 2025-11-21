import { useEffect, useState } from 'react';
import StudentService from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ studentId: 0, fullName: '', email: '', mobile: '', city: '' });

  useEffect(() => { loadStudent(); /* eslint-disable-next-line */ }, []);

  const loadStudent = async () => {
    try {
      const res = await StudentService.get(id);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load student');
    }
  };

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
      await StudentService.update(id, form);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <div className="card">
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input name="fullName" value={form.fullName || ''} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={form.email || ''} onChange={handleChange} />

        <label>Mobile</label>
        <input name="mobile" value={form.mobile || ''} onChange={handleChange} />

        <label>City</label>
        <input name="city" value={form.city || ''} onChange={handleChange} />

        <button type="submit" className="btn">Update</button>
      </form>
    </div>
  );
}
