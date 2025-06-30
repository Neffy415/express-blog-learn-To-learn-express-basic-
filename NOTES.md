# BlogPost Project: Step-by-Step Guide

This document breaks down how the BlogPost project works, from the backend server to the frontend templates and client-side scripts.

---

## 1. Project Goal

The application is a simple, personal blog where a user can:
-   View all blog posts on the homepage.
-   Create a new blog post with a title, description, and an image.
-   Delete existing blog posts.
-   Navigate the site using a responsive sidebar.

---

## 2. Project Structure

The project is organized into several key folders and files:

-   `index.js`: The heart of the application. This is the backend server powered by Node.js and Express.
-   `/views`: Contains the EJS (Embedded JavaScript) templates that create the HTML pages sent to the user.
    -   `index.ejs`: The main homepage.
    -   `post.ejs`: The page with the form to create a new post.
    -   `/partials`: Reusable template snippets.
        -   `header.ejs`: The top navigation bar.
        -   `footer.ejs`: The page footer.
-   `/public`: Holds all static assets that the browser needs. These files don't change.
    -   `/styles/style.css`: All the CSS for styling the website.
-   `/uploads`: This folder is where user-uploaded images are stored.
-   `package.json`: Lists the project's dependencies (like Express) and other metadata.

---

## 3. Backend Breakdown (`index.js`)

The server handles all the logic, data storage, and routing.

### Step 1: Imports
We start by importing the necessary libraries:
-   `express`: The web framework for creating the server and handling routes.
-   `body-parser`: Middleware to parse the data from incoming forms.
-   `multer`: Middleware specifically for handling file uploads (our images).
-   `path` & `url`: Node.js modules used to create reliable, absolute file paths.

### Step 2: Configuration
-   **`dirName`**: We create an absolute path to our project's root directory. This is crucial for reliably finding our `public` and `uploads` folders.
-   **`multer.diskStorage`**: We configure `multer` to:
    1.  **`destination`**: Save uploaded files into the `./uploads/` folder.
    2.  **`filename`**: Sanitize the original filename to remove spaces and special characters. This prevents URL and file system issues.
-   **`data = []`**: We use a simple array to store all our blog post objects in memory. In a real application, this would be a database.

### Step 3: Express App & Middleware
-   **`const app = express()`**: We create our Express application.
-   **`app.use(express.static(...))`**: This is key for serving our assets.
    -   `app.use(express.static(path.join(dirName, "public")))`: Serves files from the `public` folder (like `style.css`) from the root URL (`/`).
    -   `app.use('/uploads', express.static(path.join(dirName, 'uploads')))`: Creates a **virtual path**. It tells Express that any URL starting with `/uploads` should map to the `uploads` folder. This is why `<img src="/uploads/my-image.png">` works.
-   **`app.use(bodyParser.urlencoded({ extended: true }))`**: This allows us to read data from our forms, like the title and description, via `req.body`.

### Step 4: Routes (The App's Endpoints)
-   **`app.get("/", ...)`**: The Homepage Route.
    -   When a user visits the main URL (`http://localhost:3000/`), this route is triggered.
    -   It renders the `index.ejs` template and passes the `data` array to it as a variable named `posts`.

-   **`app.get("/post", ...)`**: The "New Post" Page Route.
    -   When a user clicks the "Post" button, they are taken to `/post`.
    -   This route simply renders the `post.ejs` template, which contains the submission form.

-   **`app.post("/submit", ...)`**: The Form Submission Route.
    -   This is where the form from `post.ejs` sends its data.
    -   `upload.single("image")` (middleware) intercepts the request first, processes the uploaded file, and makes it available as `req.file`.
    -   We extract the `title`, `description`, and the sanitized `filename` from the request.
    -   A new post object is created and `push`ed into our `data` array.
    -   `res.redirect('/')`: Crucially, it redirects the user back to the homepage to see their new post.

-   **`app.post("/delete/:id", ...)`**: The Delete Route.
    -   The delete button form in `index.ejs` submits to a URL like `/delete/1`.
    -   We get the `id` from the URL parameters (`req.params.id`).
    -   We find the post with that `id` in the `data` array and remove it.
    -   Finally, it redirects the user back to the homepage.

---

## 4. Frontend Breakdown (`/views`)

### `index.ejs`
-   This is the main page. It uses EJS tags (`<% %>`) to embed JavaScript logic directly into the HTML.
-   It checks if `posts` exists and has items (`<% if(posts && posts.length){ %>`).
-   It then loops through each `post` in the `posts` array (`<% posts.forEach(...) { %>`).
-   Inside the loop, it generates the HTML for each blog card, dynamically inserting the `post.title`, `post.desc`, and the image path (`/uploads/<%= post.image %>`).
-   It also contains the client-side JavaScript for the hamburger menu toggle.

### `post.ejs`
-   A straightforward HTML page containing a `<form>`.
-   The form's `action` is `/submit` and its `method` is `POST`.
-   **`enctype="multipart/form-data"`**: This attribute is **essential**. It tells the form to prepare the data for a file upload. Without it, `multer` would not work.

---

## 5. Workflow Summary: Creating a Post

1.  User visits `http://localhost:3000/`.
2.  The `GET /` route in `index.js` renders `index.ejs`, showing existing posts.
3.  User clicks the "Post" button, which is a link to `/post`.
4.  The `GET /post` route renders `post.ejs`.
5.  User fills out the form (title, description, image) and clicks "Post Blog".
6.  The browser sends a `POST` request to the `/submit` route.
7.  The `multer` middleware saves the image to the `/uploads` folder.
8.  The `POST /submit` route handler creates a new post object and adds it to the `data` array.
9.  The server sends a redirect response to the browser, telling it to go to `/`.
10. The browser makes a new request to `GET /`.
11. The `GET /` route renders `index.ejs` again, but this time the `posts` array includes the newly created post, so it appears on the page.
