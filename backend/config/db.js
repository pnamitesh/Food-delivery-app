import mongoose from "mongoose";

export const connectDB = async ()=>{
    (await mongoose.connect('mongodb+srv://greatstack:1223334444@cluster0.q6kbqdb.mongodb.net/food-del').then(()=> console.log("DB connected")));
}
// exporting this function so that we can use it in the server.js file 