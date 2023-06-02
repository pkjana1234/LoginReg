const express=require('express');
const Feedback_Route=express.Router();

const FeedbackController=require('../controller/FeedbackController')

Feedback_Route.post('/feedback',FeedbackController.feedback)







module.exports=Feedback_Route;