// Since this is a Middleware, it is used in the "routes" folder

const multer = require("multer");

const storageProfile = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'profile_image/')
    },
    filename: (req, file, cb) => {
        let splitted_name = file.originalname.split(".");
        let name1 = splitted_name[0].toLowerCase().split(" ").join("-");
        let name2 = splitted_name[1].toLowerCase(); //The file extension

        const full_file_name = name1+Date.now()+"."+name2;
        cb(null, full_file_name);
    }
});

const storageProduct =  multer.diskStorage({
    destination:(req, file, cb) => {
        //console.log(file);
        cb(null, "images/")
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

    } else  if(storageOption == "products"){
        // console.log("Inside MulterMiddleware");
        return multer({storage: storageProduct}).single('img_url');
    }   
}
// app.use(express.static(path.join(__dirname,"public")));

module.exports = multerMiddleware;
