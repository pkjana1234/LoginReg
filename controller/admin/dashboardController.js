const express = require('express');
const flash = require('connect-flash')
const path=require('path')
const CategoryModel = require('../../model/admin/category');
const BlogModel = require('../../model/admin/post');

const dahboard = (req, res) => {
    res.render('admin/index');
}

const category = (req, res) => {
    CategoryModel.find((error, data) => {
        if (!error) {
            res.render('admin/category', {
                message:req.flash('message'),
                error:req.flash('error'),
                displaydata: data
            })
        }
    })
}


const category_post = (req, res) => {
    //console.log(req.body)
    const Category= new CategoryModel({
        category: req.body.category,   
    })
    Category.save().then((result)=>{
         console.log(result,"category save successfully");
         req.flash('message','Added category blog Successfully');
        res.redirect('/admin/category');
    }).catch((err)=>{
        console.log(err,"product not saved")
        req.flash('error','you can not sent empty data')
        res.redirect('/admin/category');
    });
}


const blog = (req, res) => {
    BlogModel.find((error, data) => {
        if (!error) {
            res.render('admin/blog', {
                message:req.flash('message'),
                error:req.flash('error'),
                displaydata: data
            });
        }
    });
}

const blog_add = (req, res) => {
    CategoryModel.find((err, data) => {
        //console.log(data);
        if (!err) {
            res.render('admin/add_blog', {
                error:req.flash('error'),
                displaydata: data
            });
        }
    })
}

const blog_create = (req, res) => {
    BlogModel.findOne({
        slug: req.body.title.trim().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_').toLowerCase()
    }).exec((err, data) => {
        if (data) {
            req.flash("error", "Post Title Already Exists");
            res.redirect("/admin/blog/add");
        } else {
            BlogModel({
                title: req.body.title,
                postText: req.body.post,
                image: req.file.filename,
                slug: req.body.title.trim().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "_").toLowerCase(),
                category:req.body.category,
            }).save().then(result => {
                console.log("Post Added...");
                req.flash("message", "Blog Post Added successfully");
                req.flash("error", "Something Went Wrong!!!");
                res.redirect("/admin/blog");
            }).catch(err => {
                req.flash("message", "Something Went Wrong!!!");
                req.flash("error", "Something Went Wrong!!!");
                res.redirect("/admin/blog");
            })
        }
    })

}


module.exports = ({
    dahboard,
    category,
    category_post,
    blog,
    blog_add,
    blog_create
})