const validator = require('validator')
const bcrypt = require('bcrypt')
const { json } = require('express')
const cloudinary = require('cloudinary').v2
const { doctorModel } = require('../models/doctorModel.js')
const { appointmentModel } = require('../models/AppointmentModel.js')
const { userModel } = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
//api for adding doctors

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, address, fees, speciality, degree, experience, about } = req.body
        const imageFile = req.file
        // console.log({name,email,password,address,fees,speciality,degree,experience,about},imageFile)
        //checking all data to add doctor
        if (!name || !email || !password || !address || !fees || !speciality || !degree || !experience || !about) {
            return res.json({ success: false, message: "Details Missing" })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid Email" })
        }
        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a Strong password" })
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10)//between 5 and 15
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url


        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            address: JSON.parse(address),
            fees,
            speciality,
            degree,
            experience,
            about,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: "Doctor added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//Api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.send({ success: true, message: error.message })
    }
}

const allDoctors = async (req, res) => {

    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const appointmentsAdmin=async (req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentCancel=async (req,res)=>{
    try {
        const {appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //relesing doctors slot
        const {docId,slotDate,slotTime}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter((e)=>e!== slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})


        res.json({success:true,message:"Appointment Cancelled"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const adminDashboard=async (req,res)=>{
    try {
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})
        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
module.exports = { addDoctor, loginAdmin, allDoctors ,appointmentsAdmin,appointmentCancel,adminDashboard}