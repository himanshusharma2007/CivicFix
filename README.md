
# 🏙️ CivicFix – Empowering Citizens to Fix Civic Issues

CivicFix is a citizen-driven platform designed to **bridge the gap between civic problems and real solutions**. In most cities, issues like potholes, broken streetlights, and water leaks go unnoticed or unreported due to a lack of proper visibility and accountability. **CivicFix transforms these complaints into visible public movements** by allowing users to post, support, and share civic problems while encouraging authorities to take action through public pressure.

---

## 🚧 Problem It Solves

- Lack of proper civic issue reporting tools for citizens
- No centralized system for visibility, support, or tracking of issues
- Weak communication between public voices and local authorities

**CivicFix empowers communities** to report and support civic issues with images, videos, and descriptions. Through AI-based severity tagging and social engagement features, it highlights the most urgent problems for quicker response and resolution.

---

## ✨ Key Functionalities

- 📝 Citizens can report civic issues (potholes, leaks, lights, etc.) with media and location
- 🔺 Users can upvote and comment to show public support
- 🤖 AI (mocked) ranks issues as Low, Medium, or High severity
- 🔄 Social sharing to spread awareness with tagging option
- 🔒 Secure login and signup with user profile support
- 🛠️ Admin-only dashboard to update statuses and show resolved success stories

---

## 🧰 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (optional for media)
- Cloudinary (optional for image upload)

---

## 📁 Folder Structure

```
CivicFix/
├── frontend/         # React frontend
│   └── ...
├── backend/          # Express backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── server.js
|   └── .env
├── README.md

```

---

## 🔒 .env Configuration (Backend)

Create a `.env` file in the `backend` folder with the following keys:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## ⚙️ How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/himanshusharma2007/CivicFix.git
cd CivicFix
```

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

Backend will start on `http://localhost:5000`

### 3. Run the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173` (default Vite port)

---

## 🧠 Mocked AI Severity Logic

For demo, severity is tagged based on keyword matching + engagement count. (e.g., "fire", "accident", "danger" → High severity)

---

## 👥 Team

- **Himanshu Sharma** – Full Stack Developer  
- **Dhairya Jain** – Frontend Developer  
- **Nitesh Kumawat** – Frontend Developer  
- **Ujjwal Kumar** – Backend Developer  

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

> 🔔 *CivicFix – Turning civic complaints into collective action.*
