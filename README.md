# Search Engine Backend

A backend-heavy search engine built using Node.js, Express, and MongoDB, focused on **systems-level backend concepts** rather than UI.

This project implements a simplified version of how real search engines work internally:
- Inverted index
- Explicit write and read paths
- Server-side ranking
- Pagination
- Search analytics

> This is a learning-focused project designed to understand backend architecture and tradeoffs, not a production-ready search engine.

---

## Core Concepts Implemented

### 1. Inverted Index
Instead of scanning all documents for every search, the system builds an inverted index that maps terms to the documents they appear in.

This allows fast lookups and mirrors how real search engines avoid full database scans.

---

### 2. Write Path vs Read Path Separation
- **Write path**: Document creation → tokenization → index update
- **Read path**: Query parsing → index lookup → scoring → pagination

This separation is intentional and reflects real backend system design.

---

### 3. Relevance Scoring
Documents are ranked using a basic term-frequency scoring model:
- Higher frequency of query terms → higher relevance
- Results are sorted server-side before pagination

---

### 4. Backend-Owned Pagination
Pagination is handled entirely in the backend to:
- Prevent unbounded responses
- Maintain consistent API contracts
- Avoid frontend-driven performance issues

---

### 5. Search Analytics
Each search query is tracked using an isolated analytics service:
- Queries are aggregated, not logged raw
- Analytics failures never block search
- Demonstrates observability and side-effect isolation

---

## Tech Stack

- **Node.js** — asynchronous I/O and event-driven runtime
- **Express** — HTTP routing and API layer
- **MongoDB** — document storage and inverted index persistence
- **Mongoose** — schema modeling and indexing
- **Git/GitHub** — professional version control workflow

Minimal frontend by design. Backend is the focus.

---

## API Endpoints

### Create Document

Request body:
```json
{
  "title": "Node Backend",
  "content": "Node is event driven and good for IO operations"
}

### Search Document
GET /search?q=node&page=1&limit=10

### Response

{
  "query": "node",
  "page": 1,
  "limit": 10,
  "totalResults": 2,
  "results": [
    {
      "id": "...",
      "title": "Node Backend",
      "score": 2
    }
  ]
}

##Project Structure
src/
 ├── api/          # HTTP routes
 ├── services/     # Business logic (search, indexing, analytics)
 ├── models/       # Mongoose schemas
 ├── utils/        # Pure helper functions
 ├── app.js        # Express app setup
 └── server.js     # Server bootstrap


### Run locally
npm install
npm start
