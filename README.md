# 🎫 Support Ticket System

A full-stack Support Ticket Management System built for the Datastraw AI + Tech Intern Assessment.

The application allows users to create support tickets, manage ticket status, search/filter records, add notes, export data, and monitor tickets through an interactive dashboard.

---

## 🚀 Live Demo

### Frontend
https://datastraw-ticket-system.vercel.app/

### Backend API
https://datastraw-ticket-system.onrender.com/

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Framer Motion
- React Hot Toast
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON2CSV

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## ✨ Features

### Ticket Management
✅ Create support tickets

✅ View all tickets

✅ Ticket detail page

✅ Update ticket status

✅ Add notes/comments

✅ Delete tickets

---

### Dashboard Features
✅ Search tickets in real time

✅ Status filtering

✅ Dashboard analytics cards

✅ Auto refresh

✅ Loading states

✅ Smooth animations

---

### Extra Features
✅ CSV Export  
✅ Responsive Dashboard UI  
✅ Real-time Auto Refresh  
✅ Toast Notifications  
✅ Animated Cards using Framer Motion  
✅ Loading Skeleton UI  
✅ Pagination Support (3 tickets per page)

---

## Pagination

The dashboard supports pagination.

Example:

GET

/api/tickets?page=1&limit=3

/api/tickets?page=2&limit=3

/api/tickets?page=3&limit=3

Each page displays:

- 3 Tickets Per Page
---

## 📌 API Endpoints

### Create Ticket

```http
POST /api/tickets
```

Request:

```json
{
  "customer_name":"John",
  "customer_email":"john@example.com",
  "subject":"Login Issue",
  "description":"Unable to login"
}
```

---

### Get All Tickets

```http
GET /api/tickets
```

Optional:

```http
GET /api/tickets?status=Open
GET /api/tickets?search=john
```

---

### Get Single Ticket

```http
GET /api/tickets/:ticketId
```

---

### Update Ticket

```http
PUT /api/tickets/:ticketId
```

Body:

```json
{
  "status":"Closed",
  "note":"Issue resolved"
}
```

---

### Delete Ticket

```http
DELETE /api/tickets/:ticketId
```

---

## 📂 Project Structure

```bash
Datastraw_ticket_system/

│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│
│── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

Move into project:

```bash
cd Datastraw_ticket_system
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs:

```bash
http://localhost:5173
```

Backend runs:

```bash
http://localhost:5000
```

---

<img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/3ebbafda-a0d5-4c18-927d-4a9a5388afe1" />

<img width="1919" height="901" alt="image" src="https://github.com/user-attachments/assets/ca8cc0cf-c577-4dc0-a298-bf6971b92808" />



## 👨‍💻 Developer

**Sarthak Chaudhari**

Built as part of the Datastraw AI + Tech Intern Assessment.

---
