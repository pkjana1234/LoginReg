const Feedback=require('../model/feedbackModel')


const feedback= async(req,res)=>{
    if (!req.body.email && !req.body.name && !req.body.comment) {
        res.status(400).send({ message: "filed all the input filed" });
    }
    const addComment = new Feedback({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        
    });
    await addComment.save().then(data => {
        res.status(200).send({ success: true, msg: "Thank you for your valuable feedback", feedback: data });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating feedback"
        });
    });

}

module.exports=({
feedback,
})