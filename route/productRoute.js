const express=require('express');

const Product_Route=express();

const body_parser = require('body-parser')

//use body parser for get data from form body
Product_Route.use(body_parser.json());
Product_Route._router.use(body_parser.urlencoded({ extended: true }));

//use multer for file upload
const multer = require('multer');
const path = require('path');
//define the static folder 
Product_Route.use(express.static('public'));

// use multer diskStorage for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productimage'), function (error, success) {
            if (error) throw error;
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '_' + file.originalname
        cb(null, name, function (error1, success1) {
            if (error1) throw error1
        })
    }
});
//define uploaded storage path
const upload = multer({ storage: storage });

const ProductController=require('../controller/ProductController');
const auth = require('../middleware/auth')

Product_Route.post('/add-product',upload.array('image'),auth,ProductController.storeProduct);
//grt product
Product_Route.get('/get-product',auth,ProductController.getProduct);


module.exports=Product_Route;