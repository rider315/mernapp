const User=require("../models/user-model");
const Contact=require("../models/contact-model");

const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({},{password:0});
        console.log(users);
        if(!users || users.length===0){
            return res.status(404).json({message:"no users found"});

        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(`error from the admin user router ${error}`);
    }


};



const getUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        
         const data=await User.findOne({_id:id},{password:0});
        
        return res.status(200).json(data);
    } catch (error) {
        console.log(`error from the admin user edit router ${error}`);
    }


};
const updateUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        
        const updatedUserData=req.body;
        const updatedData=await User.updateOne({_id:id},{
            $set:updatedUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        console.log(`error from the admin user update router ${error}`);
    }


};
const deleteUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        
        await User.deleteOne({_id:id});
        
        return res.status(200).json({message:"User Deleted Successfully"});
    } catch (error) {
        console.log(`error from the admin user delete router ${error}`);
    }


};
const getAllContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"no contacts found"});

        }
        return res.status(200).json(contacts);
    } catch (error) {
        console.log(`error from the admin user router ${error}`);
    }


};

const deleteContactById=async(req,res)=>{
    try {
        const id=req.params.id;
        
        await Contact.deleteOne({_id:id});
        
        return res.status(200).json({message:"Contact Deleted Successfully"});
    } catch (error) {
        console.log(`error from the admin contact delete router ${error}`);
    }


};

module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};



