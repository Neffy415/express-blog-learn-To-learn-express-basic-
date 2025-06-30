import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path"; // Import path module
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

let data = [];
const DATA_FILE = "./data.json";
if (fs.existsSync(DATA_FILE)) {
  data = JSON.parse(fs.readFileSync(DATA_FILE));
}
function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const dirName = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const app = express();

// Use absolute paths for static directories
app.use(express.static(path.join(dirName, "public")));
app.use("/uploads", express.static(path.join(dirName, "uploads")));

app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
app.listen(port, () => {
  console.log("running");
});

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: data });
});

app.get("/post", (req, res) => {
  res.render("post.ejs");
});

app.post("/submit", upload.single("image"), (req, res) => {
  const title = req.body["title"];
  const desc = req.body["description"];
  const image = req.file;
  data.push({
    id: data.length + 1,
    title,
    desc,
    image: image?.filename, // Save only the filename
    createdAt: new Date(),
  });
  saveData();
  res.redirect("/"); // Redirect to home after submit
});

app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter((post) => post.id !== id);
  saveData();
  res.redirect("/"); // Redirect to home after delete
});
