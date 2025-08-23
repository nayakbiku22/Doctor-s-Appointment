const validator = require('validator')
const bcrypt = require('bcrypt')
const { userModel } = require('../models/userModel.js')
const { doctorModel } = require('../models/doctorModel.js')
const jwt = require('jsonwebtoken')
const { appointmentModel } = require('../models/AppointmentModel.js')
const  cloudinary=require('cloudinary').v2
const razorpay=require('razorpay')


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a password of minimum length of 8" })

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,

        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getProfile=async (req,res)=>{
    try{
        const {userId}=req.user
        const userData= await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const updateProfile=async (req,res)=>{
    try{
        const {name,phone,address,dob,gender}=req.body
        const {userId}=req.user
        const imageFile=req.file
        if(!name||!phone||!dob||!gender){
            return res.json({success:false,message:"Missing Details"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if(imageFile){
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl=imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
              // Fetch updated user data
        const updatedUser = await userModel.findById(userId).select('name phone address dob gender image');

        // Update all appointments with this user's new data
        await appointmentModel.updateMany(
            { userId },
            { $set: { userData: updatedUser } }
        );
        res.json({success:true,message:"Profile Updated"})
        
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const bookAppointment=async (req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime}=req.body
        const docData=await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }

        let slots_booked=docData.slots_booked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                 return res.json({success:false,message:"Slot not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }
       const userData=await userModel.findById(userId).select('-password')
       delete docData.slots_booked
       const appointmentData={
        userId,
        docId,
        userData,
        docData,
        amount:docData.fees,
        slotTime,
        slotDate,
        date:Date.now()
       }
       const newAppointment=new appointmentModel(appointmentData)
       await newAppointment.save()
       //save new slots data in doctors data
       await doctorModel.findByIdAndUpdate(docId,{slots_booked})
       res.json({success:true,message:"Appointment Booked"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const listAppointment=async (req,res)=>{
    try {
        const {userId}=req.user
        const appointments=await appointmentModel.find({userId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const cancelAppointment=async (req,res)=>{
    try {
        const {appointmentId}=req.body
        const {userId}=req.user
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData.userId!== userId){
            return res.json({success:false,message:"Unauthorized Action"})
        }
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

// const razorpayInstance=new razorpay({
//     key_id:'',
//     key_secret:''
// })


//API to make payment of appointment
// const paymentRazorpay=async (req,res)=>{

// }
module.exports = { registerUser, loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment }