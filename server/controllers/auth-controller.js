
const User = require("../models/user-model");
const bcrypt = require('bcrypt');

const home = async (req, res) => {
    try {
        res
        .status(200)
        .send("Welcomellllll Rider Infinity");
    } catch (error) {
        console.log(error);
    }
};


const register = async (req, res) => {
    try {
        const {username,email,phone,password}=req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
         return res.status(400).json({ message: "email already exists" });
        }

        // const saltRound=10;
        // const hash_password=await bcrypt.hash(password,saltRound); 


        const userCreated = await User.create({ username, email, phone, password });
        res.status(201).json({ msg: "registration successful",token: await userCreated.generateToken(),userId:userCreated._id.toString(), });
        
    } catch (error) {
        next(error);
        // res
        // .status(500)
        // .json("internal server errors");
    }
};


const login=async(req,res)=>{
    try {
        const{email,password}=req.body;

        const userExist=await User.findOne({email});
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({message:"invalid credentials by rider"});
        }
        const user=await userExist.comparePassword(password);
        // const user=await bcrypt.compare(password,userExist.password);
        if(user){
            res.status(200).json({ msg: "Login Successful",token: await userExist.generateToken(),userId:userExist._id.toString(), });
        }
        else{
            res.status(401).json({message:"Invalid email or paasword"}); 
        }
    } catch (error) {
        res.status(500).json("internal server error");
    }
};

const user=async (req,res)=>{
    try {
        const userData=req.user;
        console.log(userData);

        return res.status(200).json({userData});
        // res.status(200).json({msg:"hi user"});
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}




module.exports={ home,register,login ,user};