import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app=express()
const port=4000

//middleware
app.use(express.json())// whenever we get req from the frontend to backend parse from the json
app.use(cors())//using this we can access backend from the frontend


//db connectin
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))// Jo image file client ne bejiusko iss folder main save karliya tha   ab images wala endpoint fo use karke hmm iss uploads waale folder main se nikal kar frontend main lageyengey usse ke liye ye kiya gya hai

app.use("/api/user/",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{ // whenever we hit the url in the browser it is executed as a get method 
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://greatstack:1223334444@cluster0.q6kbqdb.mongodb.net/?