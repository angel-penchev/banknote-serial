const router = require('express').Router();
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  dest: "src/uploads",
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
})

router.post('/', upload.array('banknoteImages'), function (req, res) {
  return res.json(req.files);
});


module.exports = router;
