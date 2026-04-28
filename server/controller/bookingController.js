
import Booking from "../models/Booking.js"
import Car from "../models/Car.js";

// check availibity of car for a given date


export const checkAvailibility = async (pickupDate, returnDate, car) => {
  const bookings = await Booking.find({
    car,
    returnDate: { $gte: pickupDate },
    pickupDate: { $lte: returnDate }
  });

  return bookings.length === 0;
};

// check availibity of car for a given date and location


 export const checkAvailabilityCars = async (req, res) => {
  try {
    const { pickupDate, returnDate, pickuplocation } = req.body;

    // Fetch all cars for the given location
  const cars = await Car.find({
  location: { $regex: new RegExp(`^${pickuplocation}$`, "i") },
  isAvaliable: true
  }).lean();
    // Check car for the given date using promises
    const availableCarPromises = cars.map(async car => {
      const isAvaliable = await checkAvailibility(car._id, pickupDate, returnDate);


        console.log("Car:", car._id, "Available:", isAvaliable);
      return { ...car, isAvaliable };
    });

    let isAvaliable = await Promise.all(availableCarPromises);

    // Only keep cars that are available
    isAvaliable = isAvaliable.filter(car => car.isAvaliable === true);
    res.json({ success: true, availableCar: isAvaliable });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//api to create booking

export const createbooking = async (req,res)=>{
  try {

    
    const { _id } = req.user;
    const { pickupDate, returnDate, car } = req.body;

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (isNaN(picked) || isNaN(returned)) {
      return res.json({ success: false, message: "Invalid date format" });
    }

    if (returned <= picked) {
      return res.json({ success: false, message: "Invalid date range" });
    }

    const isAvailable = await checkAvailibility(picked, returned, car);
    if (!isAvailable) {
      return res.json({ success: false, message: "car not available" });
    }

    const carData = await Car.findById(car);

    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));

    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate: picked,
      returnDate: returned,
      price
    });

    res.json({ success: true, message: "your booking was successful" });
    console.log("REQ.BODY ", req.body);

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}



   // to get the user booking data


 export  const getUserBookings= async (req,res)=>{
    try {

        const {_id}=req.user;

        const bookings =await Booking.find({user:_id}).populate("car").sort({createdAt: -1})

        res.json({success:true , bookings})
        
    } catch (error) {
          console.log(error);
      res.json({success:false, message:error.message})
    }
   }

    // api to get OWner bookings 
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.json({ success: false, message: "unauthorised" });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car") 
      .sort({ createdAt: -1 })
      .lean(); 

    res.json({ success: true, bookings });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


  // api to change booking status 


   export    const changeBookingStatus= async (req,res)=>{
    try {
        const {_id}= req.user;

        const {booking_id, status}=req.body;

        const bookings =await Booking.findById(booking_id)

        if(bookings.owner.toString() !== _id.toString()){
            return res.json({success:false, message:"Unauthorised"})
        }
         bookings.status=status;
           await bookings.save() 


           res.json({success:true , message :"status updated"})
              
    } catch (error) {
          console.log(error);
      res.json({success:false, message:error.message})
    }

}
