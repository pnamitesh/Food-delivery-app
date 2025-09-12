import express from "express";

import { addFood,listFood ,removeFood} from "../controllers/foodController.js";
import multer  from "multer";// image storage sys

const foodRouter=express.Router();

//Image Storage Engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)// this make our filename unique
    }
})

const upload=multer({storage:storage})// using this we can store the image in the upload folder 

foodRouter.post("/add",upload.single("image"),addFood)// creating the endpoint
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

// logic for the store the product data in thedatabase






export default foodRouter;