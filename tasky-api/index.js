import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import mongoose from 'mongoose';

dotenv.config();

// --- MONGOOSE CONNECTION ---
(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tasky');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

// Serve static files from the public folder (so GET / will return public/index.html)
app.use(express.static('public'));

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
