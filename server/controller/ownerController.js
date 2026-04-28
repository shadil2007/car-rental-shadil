import imagekit from "../configs/ImageKit.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import fs from 'fs'
import Booking from "../models/Booking.js";


export const ownerChange = async (req, res) => {
  try {
    const { _id } = req.user;

    // Update user role
    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.status(200).json({ success: true, message: "Now you can list your cars" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api for car upload

export const Addcar= async(req,res)=>{
    try {

        const {_id}=req.user;
        let car =JSON.parse(req.body.carData);
        const imageFile=req.file.path;

 //upload image to imageKit
        const fileBuffer =fs.readFileSync(imageFile)
      const response=  await imagekit.upload({
            file:fileBuffer,
            fileName:req.file.originalname,
            folder:'/cars'
        })
 //optimization imagekit url formation

  var optimisedimageURL = imagekit.url({
       path : response.filePath,
       transformation:[
        {width:'1280'},//width resizing
        {quality:'auto'},//quality compressor
        {format:'webp'}//modern format
       ]


  });

  const image = optimisedimageURL;

  await Car.create({...car, owner : _id,image})

  res.json({success:true , message:"car listed"})


        
        
    } catch (error) {
         console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

   // list car details

export const getCar= async (req,res)=>{
    try {
        const {_id}= req.user;
            const cars = await Car.find({owner:_id})
      res.json({success:true,cars})

    } catch (error) {
          console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


//   toggle car availibilty


export const carAvailiblity = async (req,res)=>{
    
       try {
        const {_id}= req.user;
        const {car_id}=req.body;

     const car = await Car.findById(car_id)

     // checking car owner


   if( car.owner.toString() !== _id.toString()){
    return res.json({success:false, message:"unauthorised"})
   }

   car.isAvaliable = !car.isAvaliable;

   await car.save()

      res.json({success:true,message:"availiblity toggled"})

    } catch (error) {
          console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


// api to delete a car


export const deleteCar = async (req,res)=>{
    
       try {
        const {_id}= req.user;
        const {car_id}=req.body;

     const car = await Car.findById(car_id)

     // checking car owner


   if( car.owner.toString() !== _id.toString()){
    return res.json({success:false, message:"unauthorised"})
   }

   car.owner =null;
   car.isAvaliable=false;

   

   await car.save()

      res.json({success:true,message:"Car Removed"})

    } catch (error) {
          console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// api to get dashbaord data

export const getDashboardDAta = async (req,res)=>{
  

    try {

        const {role,_id}=req.user;

        if(role != 'owner'){
             return res.json({success:false, message:"unauthorised"}) 

        }

        const cars = await Car.find({owner:_id})

        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

const pendingBooking = bookings.filter(b => b.status === "pending");
const confirmedBooking = bookings.filter(b => b.status === "confirmed");
        const cancelledBooking = await Booking.find({owner:_id, status :"cancelled"})


        //calculate monthly revenue from confirmedbooking


        const MonthlyRevenue = bookings.slice().filter(booking=>booking.status==='confirmed').reduce((acc,booking)=> acc + booking.price,0)



       const dashboardData = {
  totalCars: cars.length,
  totalBookings: bookings.length,
  pendingBookings: pendingBooking.length,
  completedBookings: confirmedBooking.length,
  recentBookings: bookings.slice(0, 3),
  monthlyRevenue: MonthlyRevenue
}

        res.json({success:true, dashboardData})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


    // api to upadte Owner image 


 export const UpdateOwnerImage = async (req, res) => {
    try {
        const { _id } = req.user;

        //  check file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const imageFile = req.file.path;

        //  read file (async instead of sync)
        const fileBuffer = await fs.promises.readFile(imageFile);

        //  upload to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: req.file.originalname,
            folder: "/users"
        });

        //  optimized image URL
        const optimisedimageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: "400" },
                { quality: "auto" },
                { format: "webp" }
            ]
        });

        const image = optimisedimageURL;

        //  update user
        await User.findByIdAndUpdate(_id, { image });

        //  delete local file after upload
        await fs.promises.unlink(imageFile);

        return res.status(200).json({
            success: true,
            message: "Image Updated"
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
    
