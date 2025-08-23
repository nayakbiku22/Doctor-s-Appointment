const { doctorModel } = require('../models/doctorModel.js')
const { appointmentModel } = require('../models/AppointmentModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availability changed successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorsList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.user
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const { docId } = req.user
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Completed" })
        } else {
            return res.json({ success: false, message: "Mark Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const { docId } = req.user
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment Cancelled" })
        } else {
            return res.json({ success: false, message: "Cancellation Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.user
        const appointments = await appointmentModel.find({ docId })
        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Api toget doctor profile
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.user
        const profileData = await doctorModel.findById(docId )
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateDoctorProfile = async (req, res) => {
    try {
        const { fees, address, available } = req.body
        const { docId } = req.user
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
          console.log(error)
        res.json({ success: false, message: error.message })
    }

}
module.exports = { 
    changeAvailability,
     doctorsList, 
     loginDoctor,
      appointmentsDoctor, 
      appointmentComplete, 
      cancelAppointment, 
      doctorDashboard,
      doctorProfile,
      updateDoctorProfile }
