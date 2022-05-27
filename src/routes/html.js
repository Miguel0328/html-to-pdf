const express = require("express");
const multer = require("multer");
const { print } = require("../controllers/html");

const router = new express.Router();

const images = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Formato incorrecto"));
    }

    cb(undefined, true);
  },
});

router.post("/print", images.fields([{ name: "im1" }, { name: "im2" }]), print);

module.exports = router;
