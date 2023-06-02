const Product = require('../model/productModel');
const Category = require('../model/category');
const SubCategory = require('../model/subcategory');
const Store = require('../model/Store');
const User = require('../model/userModel');
const Category_Controller = require('../controller/categoryController');
const Store_Controller = require('../controller/StoreController')

const storeProduct = async (req, res) => {
    try {
        var arrImage = [];
        for (let i = 0; i < req.files.length; i++) {
            arrImage[i] = req.files[i].filename;
        }
        const product = new Product({
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.category_id,
            subcategory_id: req.body.subcategory_id,
            image: arrImage
        });
        const productData = await product.save()
        res.status(200).send({ success: true, msg: "save data successfully", data: productData })
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

//get product section
const getProduct = async (req, res) => {
    try {
        var sendData = [];
        var cat_data = await Category_Controller.get_category()
        if (cat_data.length > 0) {
            for (let i = 0; i < cat_data.length; i++) {
                var Product_data = [];
                var cat_id = cat_data[i]['_id'].toString();
                var cat_product = await Product.find({ category_id: cat_id });
                if (cat_product.length > 0) {
                    for (let j = 0; j < cat_product.length; j++) {
                        var store_data = await Store_Controller.get_Store(cat_product[j]['store_id'])
                        Product_data.push(
                            {
                                "product_name": cat_product[j]['name'],
                                "image": cat_product[j]['image'],
                                "store_data": store_data[j]['address']
                            }
                        )
                    }
                }
            }
        } else {
            res.status(200).send({ status: false, msg: "product details", data: send_data })
        }
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

module.exports = ({
    storeProduct,
    getProduct
})