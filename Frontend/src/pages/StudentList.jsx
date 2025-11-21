import { useEffect, useState } from 'react';
import StudentService from '../api';
import { Link } from 'react-router-dom';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await StudentService.getAll();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this student?')) return;
    try {
      await StudentService.remove(id);
      setStudents(students.filter(s => s.studentId !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <h3>Students</h3>
      {/* <Link to="/add" className="btn">Add Student</Link> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.studentId}>
              <td>{s.studentId}</td>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td>
              <td>{s.city}</td>
              <td>
                <Link to={`/edit/${s.studentId}`} className="btn">Update</Link>
                <button onClick={() => handleDelete(s.studentId)} className="btn danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
