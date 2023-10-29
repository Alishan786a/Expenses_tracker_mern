let multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './backend/avatars')
    },
    filename: function (req, file, cb) {
    let randomBytes=Date.now().toString();
    
      cb(null, randomBytes+file.originalname )
    }
  })
  
 exports.upload = multer({ storage: storage })