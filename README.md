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

- `api/` — TypeScript (Express) service, currently the only service built.
- `ai-service/` — Python service. (Planned.)
- `web/` — TypeScript/React frontend. (Planned.)

**Why split this way?** Python and TypeScript are each better suited to 
different parts of this problem — document/AI processing vs. type-safe API 
and frontend code. Keeping them as separate services keeps that boundary clean.


