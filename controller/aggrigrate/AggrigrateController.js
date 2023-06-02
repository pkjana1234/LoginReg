const address = require('../../model/aggrigrate/address');
const employee = require('../../model/aggrigrate/employee');

const articles=require('../../model/aggrigrate/article')

const add_address = async (req, res) => {
    try {
        const Adds = await new address({
            street: req.body.street,
            house: req.body.house,
            city: req.body.city,
            country: req.body.country,
        })
        const add_data = await Adds.save();
        res.status(200).send({ success: true, msg: "data add successfully", data: add_data })
    } catch (error) {
        res.status(400).send({ success: false, msg: "data not save" })
    }

}

const add_employee = async (req, res) => {
    try {
        const Emp = await new employee({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address_id: req.body.address_id,
        })
        const add_data = await Emp.save();
        res.status(200).send({ success: true, msg: "data add successfully", data: add_data })
    } catch (error) {
        res.status(400).send({ success: false, msg: "data not save" })
    }

}


const getAllData = async (req, res) => {
    try {
    const alldata=await employee.aggregate(
            [
                { 
                    $lookup: 
                    { 
                        from: 'addresses', 
                        localField: 'city', 
                        foreignField: "address_id",
                        as: 'Addressjkghhj' 
                    } 
                }
            ]
            )
            console.log(alldata);
        res.status(200).send({ success: false, msg: "data fetch successfully", data: alldata })
    } catch (error) {
        res.status(400).send({ success: false, msg: "data not save" })
    }

}

//for match
const addarticle = async (req, res) => {
    try {
        const Art = await new Article({
            author: req.body.author,
            score: req.body.score,
            views: req.body.views,
        })
        const add_data = await Art.save();
        res.status(200).send({ success: true, msg: "data add successfully", data: add_data })
    } catch (error) {
        res.status(400).send({ success: false, msg: "data not save" })
    }

}

const getarticle= async(req,res)=>{
    try{
        const data=await articles.aggregate(
            [ { $match : { views:"120" } } ]
        );
        console.log(data);
        res.status(200).send({ success: false, msg: "data fetch successfully", data: data })
    }catch(error){
        res.status(400).send({ success: false, msg: "data not save" })
    }
}

module.exports = ({
    add_address,
    add_employee,
    getAllData,
    addarticle,
    getarticle
})