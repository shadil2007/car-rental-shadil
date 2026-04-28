import express from 'express'
import { protect } from '../middleware/auth.js'
import { upload } from '../middleware/multer.js'
import { Addcar, carAvailiblity, deleteCar, getCar, getDashboardDAta, ownerChange, UpdateOwnerImage } from '../controller/ownerController.js'


 export const ownerRouter= express.Router()

ownerRouter.post('/change-role',protect,ownerChange)
ownerRouter.post('/add-car',upload.single("image"),protect,Addcar)
ownerRouter.post('/update-image',upload.single("image"),protect,UpdateOwnerImage)
ownerRouter.get('/cars',protect,getCar)
ownerRouter.post('/toggle-car',protect,carAvailiblity)
ownerRouter.post('/delete-car',protect,deleteCar)

ownerRouter.get('/dashboard',protect,getDashboardDAta)