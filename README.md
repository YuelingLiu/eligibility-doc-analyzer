# eligibility-doc-analyzer

## Problem

Eligibility case workers manually review large volumes of documents (pay stubs, 
ID, proof of residence) to determine benefit eligibility — a slow, error-prone process 
done largely by hand.

## Why This Project Exists

Built to relearn modern full-stack development (TypeScript, Python, SQL) and 
hands-on AI tooling, using a realistic problem as the vehicle rather than a 
toy app.

## Tech Stack

| Layer          | Technology              | Status     |
|-----------------|--------------------------|------------|
| API             | TypeScript, Express      | ✅ Built   |
| AI Service      | Python                   | 🚧 Planned |
| Database        | PostgreSQL               | 🚧 Planned |
| Frontend        | TypeScript, React        | 🚧 Planned |
| Dev tooling     | tsx (TS execution)       | ✅ Built   |

## Architecture

This project is split into three services in a monorepo:

- `api/` — TypeScript (Express) service that handles requests from the frontend 
  and orchestrates calls to the AI service.
- `ai-service/` — Python service responsible for document processing: OCR, data 
  extraction, and eligibility rule matching. (Planned — not yet built.)
- `web/` — TypeScript/React frontend where case workers upload and review 
  documents. (Planned — not yet built.)

**Why split this way?** Python has stronger tooling for OCR/AI work, while 
TypeScript gives type safety across the API and frontend boundary. Keeping the 
AI logic isolated in its own service also means it can be swapped, scaled, or 
tested independently of the web-facing API.
