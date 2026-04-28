import express from "express";
 import "dotenv/config";
 import cors from "cors";
import connectdb from "./configs/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { ownerRouter } from "./routes/ownerRouter.js";
import bookingRouter from "./routes/bookingRoutes.js";


 const app = express();


// connect datase
   await connectdb() 

//  middleware
   app.use(cors());
   app.use(express.json());


 app.get('/',(req,res)=> res.send("server is running") )
 app.use('/api/user',userRoutes)
 app.use('/api/owner',ownerRouter)
 app.use('/api/bookings',bookingRouter)

 const PORT = process.env.PORT || 3000;

 app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))