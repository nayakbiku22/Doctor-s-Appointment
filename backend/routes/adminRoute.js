const express=require('express')

const {upload}=require('../middlewares/multer.js')
const {addDoctor,loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}=require('../controllers/adminController.js')
const { authAdmin } = require('../middlewares/authAdmin.js')
const { changeAvailability } = require('../controllers/doctorController.js')


const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
module.exports={adminRouter}