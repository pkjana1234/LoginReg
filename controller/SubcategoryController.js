const Subcategory = require('../model/subcategory');

const add_sub_Category = async (req, res) => {
    try {
        const subcategory = new Subcategory({
            category_id: req.body.category_id,    
            sub_category: req.body.sub_category,
        });
        const subcatdata = await subcategory.save();
        res.status(200).send({ success: true, msg: "sub categosy added", msg: subcatdata });
    } catch (error) {
        res.status(400).send({ success: false, msg: error })
    }
}

module.exports = ({
    add_sub_Category
})