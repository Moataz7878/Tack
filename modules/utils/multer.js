import multer from "multer";
export const validation_Array = {
  image: ["image/png", "image/jpeg","image/gif" ,"image/PNG","image/PSD ","image/PDF","image/EPS",
  "image/TIFF","image/RAW","image/AI","image/INDD","image/HEIC"],
  files: ["application/pdf"],
  video:["video/MP4","video/MP2","video/MOV","video/WMV","video/MKV","video/AVI","video/VC1","video/mp4"]
};

function fileUploud(customValidation =validation_Array.image){
  try {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
      if (customValidation.includes(file.mimetype)) {
        cb(null, true);
        console.log("true");
      } else {
        cb("In_vaild",false);
      }
    }
    const upload = multer({  fileFilter, storage })
      return upload
    
  } catch (error) {
    console.log(error);
     res.json({message:'fail catch..'});
  }

}
export {fileUploud}
