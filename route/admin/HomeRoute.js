const express=require('express');
const HomeRoute=express.Router();
const multer=require('multer')
const body_parser = require('body-parser')
const path = require('path');

const DashboardController=require('../../controller/admin/dashboardController')

//use body parser for get data from form body
HomeRoute.use(body_parser.json());
HomeRoute.use(body_parser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + 'blog' + path.extname(file.originalname));
    }
})

const maxSize = 2 * 1024 * 1024; // for 1MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: {
        fileSize: maxSize
    }
});

HomeRoute.get('/dashboard',DashboardController.dahboard);
HomeRoute.get('/category',DashboardController.category);

HomeRoute.post('/category/post',DashboardController.category_post);


//blog route
HomeRoute.get('/blog',DashboardController.blog);
HomeRoute.get('/blog/add',DashboardController.blog_add);
HomeRoute.post('/blog/create',upload.single('image'),DashboardController.blog_create);



module.exports=HomeRoute