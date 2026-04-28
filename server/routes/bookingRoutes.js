import express from "express";
import { changeBookingStatus, checkAvailibility, checkAvailabilityCars, createbooking, getOwnerBookings, getUserBookings } from "../controller/bookingController.js";
import { protect } from '../middleware/auth.js'



const bookingRouter= express.Router()



bookingRouter.post('/check-availability', checkAvailabilityCars)
bookingRouter.post('/create',protect,createbooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/owner',protect,getOwnerBookings)
bookingRouter.post('/change-status',protect,changeBookingStatus)


export default bookingRouter;