import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, unique: true, trim: true },
  department: { type: String, required: true, trim: true },
  marks: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });
const Student = mongoose.model('Student', studentSchema);

app.get('/', (_req, res) => res.json({ message: 'Student CRUD API is running' }));

app.post('/api/students', async (req, res, next) => {
  try {
    const { name, rollNumber, department, marks } = req.body;
    if (!name || !rollNumber || !department || marks === undefined) {
      return res.status(400).json({ message: 'name, rollNumber, department and marks are required' });
    }
    const student = await Student.create({ name, rollNumber, department, marks });
    res.status(201).json(student);
  } catch (err) { next(err); }
});

app.get('/api/students', async (_req, res, next) => {
  try { res.json(await Student.find().sort({ createdAt: -1 })); } catch (err) { next(err); }
});

app.get('/api/students/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid student ID' });
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) { next(err); }
});

app.put('/api/students/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid student ID' });
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) { next(err); }
});

app.delete('/api/students/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid student ID' });
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully', student });
  } catch (err) { next(err); }
});

app.use((err, _req, res, _next) => {
  if (err.code === 11000) return res.status(409).json({ message: 'Roll number already exists' });
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ message: err.message });
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentdb')
  .then(() => app.listen(port, () => console.log(`API running at http://localhost:${port}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
