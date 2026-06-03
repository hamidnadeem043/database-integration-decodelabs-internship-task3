
# Project 3 — Database Integration
## DecodeLabs Industrial Training Kit | Batch 2026
<img width="1919" height="1067" alt="image" src="https://github.com/user-attachments/assets/3fe1d524-2877-4feb-b659-3c6872580c01" />
---

## What This Project Builds

A complete **Database Integration** connecting
REST API with MongoDB using Node.js + Express.js + Mongoose with:
- Real MongoDB database (persistent storage)
- Complete CRUD operations with database
- Schema design with Mongoose
- Data validation at database level
- Secure credentials with dotenv

---

## Project Structure

task3/
├── server.js        ← Main server + database logic
├── .env             ← Secret credentials (not on GitHub)
├── .gitignore       ← Ignores node_modules and .env
├── package.json     ← Project dependencies
└── README.md        ← This file

---

## Setup & Run

```bash
# Step 1: Install dependencies
npm install

# Step 2: Create .env file
MONGO_URI=your_mongodb_connection_string
PORT=3000

# Step 3: Start server
node server.js

# You should see:
# ✅ Server chal raha hai: http://localhost:3000
# ✅ MongoDB se connection ho gaya!
```

---

## API Endpoints

| Method | URL | Description | Status |
|--------|-----|-------------|--------|
| GET | /api/users | Get all users | 200 |
| GET | /api/users/:id | Get one user | 200 / 404 |
| POST | /api/users | Create user | 201 / 400 |
| PUT | /api/users/:id | Update user | 200 / 400 / 404 |
| DELETE | /api/users/:id | Delete user | 200 / 404 |

---

## Database Schema

```javascript
User {
  name:      String  (required)
  email:     String  (required, unique)
  age:       Number  (optional, 1-120)
  createdAt: Date    (auto-generated)
}
```

---

## Key Concepts Demonstrated

1. **MongoDB** — NoSQL database for persistent storage
2. **Mongoose** — ODM library to connect Node.js with MongoDB
3. **Schema Design** — Blueprint of data structure
4. **Data Persistence** — Data survives server restarts
5. **dotenv** — Secure credential management
6. **Duplicate Key Prevention** — Unique email enforcement
7. **Mongoose Validation** — Schema-level data validation

---

## Project 2 vs Project 3

| Feature | Project 2 | Project 3 |
|---------|-----------|-----------|
| Storage | RAM Array | MongoDB |
| Restart | Data lost | Data safe |
| Scale | Limited | Unlimited |
| Real World | No | Yes ✅ |

---

## What to Extend Next

- Add JWT Authentication
- Add password hashing with bcrypt
- Add pagination
- Deploy to Railway or Render
