import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})

// "axios": "^1.7.2",
//     "react": "18.3.1",
//     "react-dom": "^18.0.0",
//     "react-icons": "5.2.1",
//     "react-router-dom": "6.23.1",
//     "sass": "1.77.5"