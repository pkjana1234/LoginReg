const Store = require('../model/Store');
const User = require('../model/userModel')

const create_store = async (req, res) => {
try{

   const userData= await User.findOne({_id:req.body.vendor_id});
   if(userData){
    //check logititude
    if(!req.body.latitude || !req.body.longitude){
        res.status(200).send({success:false,msg:"lat and long not found"})
    }
    else{
        //check vendor id exist
        const vendorData= await Store.findOne({vendor_id:req.body.vendor_id});
        if(vendorData){
            res.status(200).send({success:false,msg:"vendor is already exist"})
        }else{
            const store= new Store({
                vendor_id:req.body.vendor_id,
                logo:req.file.filename,
                business_email:req.body.business_email,
                address:req.body.address,
                pin:req.body.pin,
                location:{
                    type:"Point",
                    coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                }
            });
           const storeData= await store.save();
           res.status(200).send({success:false,msg:"Store data",data:storeData})
        }
    }
   }
   else{
    res.status(200).send({success:false,msg:"vendor id not exist"})
   }

}catch(error){
    res.status(400).send(error.message)
}

}

//get store

const get_Store=async(id)=>{
    try{
      const store=await  Store.findOne({_id:id});
      return store;

    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = ({
    create_store,
    get_Store
})