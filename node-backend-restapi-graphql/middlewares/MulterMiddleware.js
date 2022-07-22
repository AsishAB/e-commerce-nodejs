// Since this is a Middleware, it is used in the "routes" folder


const { v4: uuidv4 } = require('uuid'); //Only Required for REST APIs
const multer = require("multer");
const fileLocation = "public/";

const storageProfile = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, fileLocation + 'profile_image/');
    },
    filename: (req, file, cb) => {
        let splitted_name = file.originalname.split(".");
        let name1 = splitted_name[0].toLowerCase().split(" ").join("-");
        let name2 = splitted_name[1].toLowerCase(); //The file extension

        const full_file_name = name1+Date.now()+"."+name2;
        cb(null, full_file_name);
    }
});

const storagePost =  multer.diskStorage({
    destination:(req, file, cb) => {
        //console.log(file);
        cb(null, fileLocation + "post_images/");
    },
    filename: (req, file, cb) => {
        let splitted_name = file.originalname.split(".");
        let name1 = splitted_name[0].toLowerCase().split(" ").join("-");
        let name2 = splitted_name[1].toLowerCase();

        const full_file_name = name1+Date.now()+"."+name2;
        cb(null, full_file_name);

    }

});




const multerMiddleware = (storageOption) => {
    // console.log(storageOption);
    if(storageOption == "profile"){
      return  multer({storage: storageProfile}).any();

    } else  if(storageOption == "posts"){
        
        return multer({storage: storagePost}).single('postImage');
        
    }   
}

module.exports = multerMiddleware;
