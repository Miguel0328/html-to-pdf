const pdf = require("html-pdf");
const fs = require("fs");
var path = require("path");

const options = {
  format: "Letter",
  orientation: "portrait",
};

const imgTemplate = `<img src="data:image/png;base64, .img." alt="img 1" />`;

exports.print = (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, "../templates/reporte.html"), "utf8");

  const img1 = req.files.im1[0].buffer.toString("base64");
  const img2 = req.files.im2[0].buffer.toString("base64");

  let secc1 = "";

  req.files.im1.forEach((x) => {
    console.log(x);
    const b64 = x.buffer.toString("base64");
    secc1 += imgTemplate.replace(".img.", b64);
  });

  html = html.replace("{{base64-1}}", img1);
  html = html.replace("{{base64-2}}", img2);
  html = html.replace("[seccion1]", secc1);

  pdf.create(html, options).toStream((err, stream) => {
    if (err) return res.send(err);

    res.setHeader("Content-disposition", "attachment; filename=test.pdf");
    stream.pipe(res);
  });
};
