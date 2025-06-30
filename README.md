# express-blog-learn-To-learn-express-basic-
Simple Blogpost app (To Learn ExpressJS &amp; NodeJs working)
Sure! Here's a professionally formatted and clean version of your **README.md** file for the BlogPost application, ready to use:

---

# 📝 BlogPost Application

A simple, dynamic blog platform built with **Node.js**, **Express**, and **EJS**, allowing users to create, view, and delete blog posts with uploaded images.

---

## 🚀 Features

* ✍️ **Create Posts** – Add blog posts with a title, description, and image via a submission form.
* 🖼️ **Image Uploads** – Uses `multer` to handle image uploads and save them on the server.
* 📃 **View Posts** – All submitted posts are displayed on the homepage.
* ❌ **Delete Posts** – Each post has a delete button for removal.
* 📱 **Responsive Design** – Mobile-friendly layout with a collapsible sidebar.

---

## 🛠️ Technologies Used

* **Backend:** Node.js, Express.js
* **Templating Engine:** EJS (Embedded JavaScript)
* **Middleware:**

  * `body-parser` – To parse incoming form data
  * `multer` – To handle file uploads (images)
* **Frontend:** HTML, CSS, Vanilla JavaScript

---

## ⚙️ Setup and Installation

Follow these steps to run the project locally:

1. **Install Node.js**
   [Download Node.js](https://nodejs.org/) and install it if you haven’t already.

2. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/BlogPost.git
   cd BlogPost
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Server**

   ```bash
   node index.js
   ```

5. **Open in Browser**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
BlogPost/
├── index.js                # Main server file
├── package.json            # Project metadata and dependencies
├── public/
│   └── styles/
│       └── style.css       # All CSS styles
├── uploads/                # Folder for uploaded images
├── views/
│   ├── index.ejs           # Homepage template
│   ├── post.ejs            # Post creation form
│   └── partials/
│       ├── header.ejs      # Common header
│       └── footer.ejs      # Common footer
└── README.md               # Project documentation (this file)
```

---

## 🧠 How It Works

This application follows a basic **MVC-style architecture**:

* **Model (Data):**
  Uses an in-memory JavaScript array to store blog post objects (non-persistent).

* **View (EJS Templates):**
  The `views/` folder contains dynamic templates rendered by the server using EJS.

* **Controller (Routes in `index.js`):**

  * `/` – Homepage showing all posts
  * `/post` – Form to add a new post
  * `/submit` – Handles form submission
  * `/delete/:id` – Deletes a specific post based on its ID

* **Static Files:**

  * CSS files are served from the `public/` directory
  * Uploaded images are stored and served from the `uploads/` folder

---



Let me know if you want a version with emojis removed or tailored for GitHub Pages!
