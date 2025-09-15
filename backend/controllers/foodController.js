import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item


// using this we can add the new image of the food in the frontend and can also in the uploads folder 
const addFood= async (req, res)=>{
    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch(error){
        console.log(error)
        res.json({success:"false",message:"Error"})
    }
}
// all food list 

const listFood= async(req,res) =>{
    try {
        const foods= await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
} //our multiple food item are being added in the database 

//remove food item
const removeFood=async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id)// this is we are doing to find the food item to remove . We gonna use the id that is automatically created by the mongodB to remove the food item #find the food model by the id.

        fs.unlink(`uploads/${food.image}`,()=>{})// this line we can delete the image from the folder 

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}