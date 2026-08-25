CREATE TYPE case_status AS ENUM ('pending', 'approved', 'denied');
CREATE TYPE document_processing_status AS ENUM ('pending', 'processed', 'needs_review', 'failed');

CREATE TABLE cases (
  id SERIAL PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  status case_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  case_id INTEGER NOT NULL REFERENCES cases(id),
  document_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  extracted_data JSONB,
  processing_status document_processing_status NOT NULL DEFAULT 'pending',
  uploaded_at TIMESTAMP NOT NULL DEFAULT now()
);