📘 BACKEND README

👉 Repo: https://github.com/moolraaj/SOCIAL_APP_BACKEND

# Mini Social Media App – Backend API

This is the backend API for the **Mini Social Media Post System** assignment.  
It provides REST APIs to upload posts with images, fetch posts, and add comments.

---

## 🔗 Live URLs

- **Backend API (Render):** https://social-app-backend-9dgn.onrender.com
- **Health Check:** https://social-app-backend-9dgn.onrender.com/api/health
- **GitHub Repo:** https://github.com/moolraaj/SOCIAL_APP_BACKEND

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Multer (Image Upload)
- CORS
- dotenv

---

## 📂 Folder Structure



src/
│── config/
│   ├── db.ts              # MongoDB connection
│   └── cloudinary.ts      # Cloudinary configuration
│
│── controllers/
│   └── postController.ts  # Post & comment logic
│
│── middleware/
│   ├── upload.ts          # Multer + Cloudinary storage
│   ├── validation.ts      # Request validation
│   └── errorHandler.ts    # Global error handling
│
│── models/
│   └── Post.ts            # Mongoose schema
│
│── routes/
│   └── postRoutes.ts      # API routes
│
│── utils/
│   └── catchAsync.ts      # Async error wrapper
│
│── server.ts              # Server entry point



---

## 🚀 How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/moolraaj/SOCIAL_APP_BACKEND.git
cd SOCIAL_APP_BACKEND

2️⃣ Install dependencies
npm install

3️⃣ Create .env file

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4️⃣ Start the server

npm run dev


Server will run on:

http://localhost:5000


🔌 API Endpoints
➕ Create Post

POST /api/posts

in Request Body choose  (Form Data) add bwlow content using postman

 {
 "image": "/uploads/image-123456.png",
 "caption": "This is my first post",
 }

Form Data:

image → JPG / PNG (max 5MB)

caption → string (max 500 characters)

📄 Get All Posts

GET /api/posts

Returns all posts with image, caption, timestamp, and comments.

💬 Add Comment

POST /api/posts/:id/comments

Request Body:

{
  "text": "Nice post!"
}

PATCH /api/posts/:postId/comments/:commentId

{
  "text": "Updated comment text"
}

DELETE /api/posts/:postId/comments/:commentId

🧪 API Testing Example
curl https://social-app-backend-9dgn.onrender.com/api/posts

✅ Features Implemented

Image upload using Multer

MongoDB database integration (bonus)

Input validation

Centralized error handling

CORS enabled

Clean REST API design

📌 Deployment

Backend deployed on Render

Uses MongoDB Atlas for database

Static image serving via /uploads



########################## Deployment Note
The backend is deployed on Render (free tier).
Due to free-tier limitations, the server may go into sleep mode when inactive.
If the API feels slow or unresponsive:
- Please wait 20–30 seconds for the server to wake up
- Or refresh the page once
This is a deployment limitation, not an application issue.


🧠 Architecture Decision (Why Cloudinary?)

Local image storage (/uploads) is unreliable on cloud platforms due to ephemeral filesystems.
To ensure reliability in production:

Images are uploaded to Cloudinary and only the secure URL is stored in MongoDB.