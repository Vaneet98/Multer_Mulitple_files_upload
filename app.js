const express = require("express");
const app = express();
const ejs = require("ejs");
const { join } = require("path");
const multer = require("multer");
const path = require("path");
app.use(express.static(join(process.cwd(), "uploads")));
const port = process.env.PORT || 3030;
app.set("view engine", "ejs");
var Storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
/*
//for multiple files
var uploaded = multer({ storage: Storage }).array("myfiles", 3);

//for single file
var upload = multer({ storage: Storage }).single("myfile");
app.get("/", (req, res) => {
  res.render("index");
});

//one time only one work
//for upload multiple files
app.post("/upload", uploaded, (req, res) => {
  res.render("index", {
    msg: "File uploaded.",
    file: `uploads/${req.files.filename}`,
  });
});
//for upload single file
app.post("/upload", upload, (req, res) => {
  res.render("index", {
    msg: "File uploaded.",
    file: `uploads/${req.file.filename}`,
  });
}); */

var upload = multer({ storage: Storage });

var uploadMultiple = upload.fields([
  { name: "myfile", maxCount: 1 },
  { name: "myfiles", maxCount: 10 },
]);
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", uploadMultiple, (req, res) => {
  res.render("index", {
    msg: "File uploaded.",
  });
});

app.listen(port, () => {
  console.log(`listening in the port http://localhost:${port}`);
});
