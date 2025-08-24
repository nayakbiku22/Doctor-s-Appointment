const express=require('express')
const cors=require('cors')
const { connectDB } = require('./config/mongodb.js')
require('dotenv').config()
const {connectCloudinary}=require('./config/cloudinary.js')
const { adminRouter } = require('./routes/adminRoute.js')
const { doctorRouter } = require('./routes/doctorRoute.js')
const { userRouter } = require('./routes/userRoute.js')

//app config
const app=express()
const port=process.env.PORT || 8080
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())


//endpoints
app.use('/api/admin',adminRouter)
//localhost:8080/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
//localhost:8080/api/doctor/list
app.use('/api/user',userRouter)
//localhost:8080/api/user/register

app.get('/',(req,res)=>{
    res.send("Api is Working")
})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})