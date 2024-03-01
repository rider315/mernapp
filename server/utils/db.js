const mongoose=require("mongoose");
// const URI=" mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI);
const URI= process.env.MONGODB_URI;
// const URI= "mongodb+srv://jaatsaab735:Gaurav_3152@mernsuper.hf9kj5b.mongodb.net/?retryWrites=true&w=majority&appName=mernsuper";
const connectDB=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection is succesful to DB");

    } catch (error) {
        console.log(error);
        // console.log("database connection is faied");
        process.exit(0);
    }
};


module.exports=connectDB;

