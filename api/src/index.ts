import express from 'express';
import { pool } from './db.js';
import multer from 'multer';
const PORT = 3001;

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/documents', upload.single('file'), async (req, res) => {
  const { caseId, documentType } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO documents (case_id, document_type, file_path) VALUES ($1, $2, $3) RETURNING *',
      [caseId, documentType, file.path],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
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

app.get('/cases', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM cases ORDER BY created_at DESC',
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// adding cases/:id endpoint to get a specific case by ID
app.get('/cases/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM cases WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case not found' }); // return 404 if no case is found with the given ID
    }

    res.json(result.rows[0]); // return the case if found
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
