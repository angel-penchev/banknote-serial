import { addBanknoteDetails, getBanknotes, updateBanknoteSerials, patchBanknote } from '../../models/banknote'

const router = require('express').Router();
const multer = require('multer');
const { spawn } = require('child_process');

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

router.post('/', upload.array('images'), function (req, res) {
  addBanknoteDetails(req, res);

  let scriptArguments = ["../recognition/detect.py"];
  req.files.forEach((f) => {
    scriptArguments.push(f["path"]);
  });

  let detectionResponse;
  const python = spawn('python3', scriptArguments);
  python.stdout.on('data', function (data) {
    detectionResponse = data.toString().split('\n');
  });

  python.on('close', () => {
    let detection_results = [];
    if (req.query.brief === "true") {
      req.files.forEach((f, i) => {
        detection_results.push({
          "original_name": f.originalname,
          "filename": f.filename,
          "serial": detectionResponse[i]
        });
      })
    } else {
      req.files.forEach((f, i) => {
        detection_results.push({
          "field_name": f.filename,
          "original_name": f.originalname,
          "mimetype": f.mimetype,
          "filename": f.filename,
          "size": f.size,
          "serial": detectionResponse[i]
        });
      })
    }
    res.send(detection_results);
    updateBanknoteSerials({ "serials": detectionResponse, "files": req.files });
  });
});

router.get('/', getBanknotes);

router.patch('/', patchBanknote);

module.exports = router;
