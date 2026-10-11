import { useState } from 'react';
function StudentForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', roll: '', department: '', marks: '' });
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function submit(e) { e.preventDefault(); onAdd({ ...form, marks: Number(form.marks) }); setForm({ name: '', roll: '', department: '', marks: '' }); }
  return <form className="panel" onSubmit={submit}><h2>Add Student</h2>
    <label>Student name<input name="name" value={form.name} onChange={change} required /></label>
    <label>Roll number<input name="roll" value={form.roll} onChange={change} required /></label>
    <label>Department<select name="department" value={form.department} onChange={change} required><option value="">Select department</option><option>IT</option><option>Computer</option><option>Data Science</option><option>ENTC</option></select></label>
    <label>Marks (0–100)<input name="marks" type="number" min="0" max="100" value={form.marks} onChange={change} required /></label>
    <button>Add Student</button></form>;
}
function StudentDetails({ students }) {
  return <section className="panel"><h2>Student Details</h2>{students.length===0?<p>No student records yet. Add a student using the form.</p>:
    <div className="cards">{students.map(s=><article className="student" key={s.roll}><h3>{s.name}</h3><p><b>Roll:</b> {s.roll}</p><p><b>Department:</b> {s.department}</p><p><b>Marks:</b> {s.marks}/100</p></article>)}</div>}</section>;
}
export default function App() {
  const [students, setStudents] = useState([]);
  function addStudent(student) {
    if (students.some(s => s.roll.toLowerCase() === student.roll.toLowerCase())) { alert('That roll number already exists.'); return; }
    setStudents(prev => [...prev, student]);
  }
  return <main className="container"><header><p className="eyebrow">REACT PRACTICAL · 06</p><h1>Student Information</h1><p>Prathamesh Baban Apsunde · Information Technology</p><p>Enter and view student details using reusable components.</p></header><StudentForm onAdd={addStudent}/><StudentDetails students={students}/></main>;
}
