const express = require('express');
const BlogApi = require('../model/admin/post');
const CategoryModel = require('../model/admin/category')

//show all blog details
const allBlog = async (req, res) => {
    try {
        const Blogdta = await BlogApi.aggregate([{$sort:{title:-1}}])
        res.status(200).json({ status: 'success', data: Blogdta })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

//show blog details on perticluser post
const blogdetail = async (req, res) => {
    try {
        const dataresponse = await BlogApi.findById({ _id:req.params.id });
        console.log(dataresponse);
        if (dataresponse) {
            res.status(200).json({ status: 'success', data: dataresponse });
        } else {
            res.status(400).json({ status: 'failed', 'msg': "data not found" });
        }
    } catch (error) {
        console.log(error);
    }
}
//view category wise post data api
const category = async (req, res) => {
    try {
        const BlogData = await BlogApi.find({ category: req.params._id }).populate('category');

        if (BlogData) {
            res.status(200).json({ status: 'success', data: BlogData });
        } else {
            res.status(400).json({ status: 'failed', 'msg': "data not found" });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}

const showallcategory = async (req, res) => {
    try {
        const Category = await CategoryModel.find()
        res.status(200).json({ status: 'success', data: Category })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}
const latestPost = async (req, res) => {
    try {
        const post = await BlogApi.aggregate([{ $limit: 5 }, { $sort: { title: -1 } }]).exec(function (err, data) {
            if (!err) {
                res.status(200).json({ status: 'success', data: data })
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//filter post  data
const filetr = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await BlogApi
          .find({
            $or: [
              {  title: { $regex: keyword, $options: "i" } },
              { postText: { $regex: keyword, $options: "i" } },
            ],
          })
          .select("-image");
        res.json(resutls);
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error In Search Product API",
          error,
        });
      }
    // try {
    //     var search = req.body.search;
    //     const filterData = await BlogApi.find(
    //         { "title": { $regex: ".*" + search + ".*" } }
    //     );
    //     if (filterData.length > 0) {
    //         return res.status(200).json({ status: true, msg: filterData });
    //     } else {
    //         return res.status(404).json({ status: false, msg: "data not found " });
    //     }

    // } catch (err) {
    //     return res.status(404).json({ error: err.error });
    // }
}

module.exports = ({
    allBlog,
    category,
    blogdetail,
    showallcategory,
    latestPost,
    filetr,
})
