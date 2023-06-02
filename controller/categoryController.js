const Category = require('../model/category')

const add_Category = async (req, res) => {
    try {
        const category = await new Category({
            category: req.body.category
        })
        const cat_data = await category.save();
        res.status(200).send({ success: false, msg: "add category data", data: cat_data })
    } catch (error) {
        res.status(400).send({ success: false, msg: "not save" })
    }
}

const get_category = async () => {
    try {
        const response = await Category.find();
        res.status(200).send({ success: true, msg: "get category data", data: response })
    } catch (error) {
        res.status(400).send({ success: false, msg: "not save" })
    }
}


module.exports = ({
    add_Category,
    get_category
})