# N+1 Problem Research

A Node.js Express application that demonstrates and compares the N+1 problem in database queries. This project shows the performance difference between queries with and without JOIN operations to illustrate how the N+1 problem affects application performance.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Performance Comparison](#performance-comparison)
- [License](#license)

## Overview

The N+1 problem is a common performance issue in web applications where an initial query to retrieve N records is followed by N additional queries to fetch related data. This project demonstrates:

1. **Without JOIN (N+1 Problem)**: Multiple separate queries that cause performance issues
2. **With JOIN (Optimized)**: Single queries using JOINs for better performance

## Features

- Performance comparison between N+1 and optimized queries
- Real-time query execution time measurement
- Query count tracking
- Three complexity levels:
  - Authors with Books
  - Authors with Books and Reviews
  - Authors with Books, Reviews, and Comments
- Support for both local PostgreSQL and Supabase

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/BIMASKUY/n-1-problem-research.git
cd n-1-problem-research
```

2. Install dependencies:
```bash
npm install
```

## Database Setup

1. Create a PostgreSQL database named `mptp`

2. Set up the database schema by running the DDL script:
```sql
-- Run the DDL commands from sql/ddl.sql (create tables)
```

3. Populate the database with sample data:
```sql
-- Run the DML commands from sql/dml.sql (insert sample data)
```

The database includes:
- **Authors**: 50 authors with contact information
- **Books**: 400 books across various genres
- **Reviews**: 450 book reviews with ratings
- **Comments**: 500 comments on reviews

## Configuration

1. Create a `.env` file in the root directory:
```env
PORT=3000
LOCAL_DB_USER=postgres
LOCAL_DB_HOST=localhost
LOCAL_DB_NAME=mptp
LOCAL_DB_PASSWORD=your_password
LOCAL_DB_PORT=5432
SUPABASE_CONNECTION_STRING=your_supabase_connection_string
```

2. Choose your database connection:
   - **Local PostgreSQL**: Use the `LOCAL_DB_*` variables (default)
   - **Supabase**: Uncomment the Supabase configuration in [`src/util/database.util.js`](src/util/database.util.js)

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Without JOIN (N+1 Problem)
- `GET /api/without-join/authors-with-books`
- `GET /api/without-join/authors-with-books-and-reviews`
- `GET /api/without-join/authors-with-books-reviews-and-comments`

### With JOIN (Optimized)
- `GET /api/join/authors-with-books`
- `GET /api/join/authors-with-books-and-reviews`
- `GET /api/join/authors-with-books-reviews-and-comments`

### Response Format
```json
{
  "message": "Get Authors with Books without Join",
  "time": "150 ms",
  "query_count": 51,
  "data": [...]
}
```

## Project Structure

```
├── app.js                              # Main application entry point
├── src/
│   ├── controller/
│   │   ├── raw-query-with-join.controller.js     # JOIN query controllers
│   │   └── raw-query-without-join.controller.js  # N+1 problem controllers
│   ├── service/
│   │   ├── raw-query-with-join.service.js        # Optimized query logic
│   │   └── raw-query-without-join.service.js     # N+1 problem query logic
│   ├── route/
│   │   ├── index.js                               # Route aggregator
│   │   ├── raw-query-with-join.route.js          # JOIN endpoints
│   │   └── raw-query-without-join.route.js       # N+1 endpoints
│   └── util/
│       └── database.util.js                       # Database connection
├── sql/
│   ├── ddl.sql                         # Database schema
│   └── dml.sql                         # Sample data
└── README.md
```

## Performance Comparison

### Example Results

**Without JOIN (N+1 Problem):**
- Authors with Books: ~50+ queries, ~150ms
- Authors with Books and Reviews: ~300+ queries, ~800ms
- Authors with Books, Reviews, and Comments: ~1000+ queries, ~2000ms

**With JOIN (Optimized):**
- Authors with Books: 1 query, ~20ms
- Authors with Books and Reviews: 1 query, ~30ms
- Authors with Books, Reviews, and Comments: 1 query, ~40ms

### Key Classes

- [`WithoutJoinService`](src/service/raw-query-without-join.service.js): Demonstrates N+1 problem with multiple queries
- [`WithJoinService`](src/service/raw-query-with-join.service.js): Shows optimized approach using JOINs

## Testing the Performance

1. Start the application
2. Test N+1 endpoints first to see the performance impact
3. Test JOIN endpoints to see the improvement
4. Compare the `time` and `query_count` values in responses

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Bima Rizqy Ramadhan**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

This project is designed for educational purposes to demonstrate database query optimization techniques and the impact of the N+1 problem on application performance.