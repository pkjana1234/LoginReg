const express = require('express');
const store_route = express();
const bodyParser = require('body-parser')

//use body parser for get data from form body
store_route.use(bodyParser.json());
store_route.use(bodyParser.urlencoded({ extended: true }));

//use multer for file upload
const multer = require('multer');
const path = require('path');

//define the static folder 
store_route.use(express.static('public'));
// use multer diskStorage for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/storeimages'), function (error, success) {
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
const auth = require('../middleware/auth');
const StoreController = require('../controller/StoreController')
store_route.post('/create-store', auth, upload.single('logo'), StoreController.create_store);

module.exports = store_route;