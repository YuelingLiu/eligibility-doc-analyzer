import express from 'express';
import { pool } from './db.js';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// endpoint to create a new case
app.post('/cases', async (req, res) => {
  console.log('Received request:', req.body);
  const { applicantName } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO cases (applicant_name) VALUES ($1) RETURNING *',
      [applicantName],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
