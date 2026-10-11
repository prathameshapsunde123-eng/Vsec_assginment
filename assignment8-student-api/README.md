# Assignment 8 — Student CRUD REST API\n\n**Prepared by:** Prathamesh Baban Apsunde  \n**Department:** Information Technology  \n**College:** MVPS’s KBT College of Engineering, Nashik

## Requirements
- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas connection string
- Postman

## Setup
1. Open this folder in VS Code.
2. Copy `.env.example` to a new file named `.env`.
3. Set `MONGODB_URI` to your local MongoDB URL or Atlas connection string.
4. In Terminal, run:
   ```bash
   npm install
   npm run dev
   ```
5. Visit `http://localhost:5000` to confirm the API is running.

Do not upload `.env` or share your database password.

## Postman endpoints
Base URL: `http://localhost:5000`

| Method | URL | Body |
|---|---|---|
| POST | `/api/students` | JSON student details |
| GET | `/api/students` | none |
| GET | `/api/students/:id` | none |
| PUT | `/api/students/:id` | JSON fields to update |
| DELETE | `/api/students/:id` | none |

### Example POST body (choose Body → raw → JSON)
```json
{
  "name": "Prathamesh Baban Apsunde",
  "rollNumber": "IT001",
  "department": "IT",
  "marks": 86
}
```

To update or delete a student, first send GET `/api/students`, then copy the `_id` from the response and replace `:id` in the URL. Marks must be between 0 and 100. Roll numbers must be unique.
