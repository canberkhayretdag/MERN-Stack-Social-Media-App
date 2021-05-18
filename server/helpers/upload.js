const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path')
const cryptoRandomString = require('crypto-random-string');
const __basedir = path.resolve(path.dirname(''));

const r = cryptoRandomString({length: 25, type: 'alphanumeric'});

module.exports = (req, res, next) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, __basedir + "/media/");
        }, r
      });
    
      let uploadFile = multer({
        storage: storage,
        limits: { fileSize: maxSize },
      }).single("file");
}

  