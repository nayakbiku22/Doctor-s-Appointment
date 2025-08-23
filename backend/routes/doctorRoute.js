const express=require('express')
const { doctorsList, loginDoctor, appointmentsDoctor, appointmentComplete, cancelAppointment, doctorDashboard, doctorProfile, updateDoctorProfile } = require('../controllers/doctorController.js')
const authDoctor = require('../middlewares/authDoctor.js')
const doctorRouter=express.Router()


doctorRouter.get('/list',doctorsList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
module.exports={doctorRouter}