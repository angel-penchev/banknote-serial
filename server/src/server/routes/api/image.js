const router = require('express').Router();
const multer = require('multer');
var fs = require('fs');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  dest: "src/server/uploads",
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
})

router.get('/', upload.array('images'), function (req, res) {
  let dir = 'src/server/uploads/';
  let path = req.query.path;
  var file = dir + path;
  console.log(file)

  var s = fs.createReadStream(file);
  s.on('open', function () {
    res.set('Content-Type', 'image/jpeg');
    s.pipe(res);
  });
  s.on('error', function () {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not found');
  });
});

module.exports = router;
