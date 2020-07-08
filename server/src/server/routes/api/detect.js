const router = require('express').Router();
const multer = require('multer');
const { spawn } = require('child_process');
const e = require('express');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  dest: "src/assets/uploads",
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
})

router.post('/', upload.array('images'), function (req, res) {
  let scriptArguments = ["../recognition/detect.py"];
  req.files.forEach((f) => scriptArguments.push(f["path"]));

  let detectionResponse;
  const python = spawn('python3', scriptArguments);
  python.stdout.on('data', function (data) {
    detectionResponse = data.toString().split('\n');
  });

  python.on('close', () => {
    if (req.query.brief === "true") {
      let result = [];
      req.files.forEach((f, i) => {
        result.push({
          "originalname": f.originalname,
          "filename": f.filename,
          "serial": detectionResponse[i]
        });
      })
      res.send(result);
    } else {
      req.files.forEach((f, i) => {
        f["serial"] = detectionResponse[i];
      })
      res.send(req.files);
    }
  });
});


module.exports = router;
