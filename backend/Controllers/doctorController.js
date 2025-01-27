import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateDoctor = async (req, res) => {
    const id = req.params.id

    try {
        const updateDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({ success: true, message: "Successfully updated", data: updateDoctor })
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to updated" })

    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id

    try {
        await Doctor.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Successfully deleted" })
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" })

    }
}

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id

    try {
        const doctor = await Doctor.findById(id).populate('reviews').select("-password")
        res.status(200).json({ success: true, message: "Doctor found", data: doctor })
    } catch (err) {
        res.status(404).json({ success: false, message: "No Doctor found" })

    }
}

export const getAllDoctors = async (req, res) => {

    try {
        const { query } = req.query
        let doctors;

        if (query) {
            doctors = await Doctor.find(
                {
                    isApproved: 'approved', $or: [
                        { name: { $regex: query, $options: 'i' } },
                        { specialization: { $regex: query, $options: 'i' } },
                    ]
                }).select('-password')
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select("-password")
        }


        res.status(200).json({ success: true, message: "Doctors found", data: doctors })
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" })

    }
}

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;
    try {
        const doctor = await Doctor.findById(doctorId)
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }

        const { password, ...rest } = doctor._doc
        const appointments = await Booking.find({ doctor: doctorId })

        res.status(200).json({ success: true, message: 'Profile into is getting', data: { ...rest, appointments } })
    } catch (err) {

        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' })
    }
}

export const getAllDoctorsAdmin = async (req, res) => {
    try {
        const doctors = await Doctor.find({})
        res.status(200).json({ success: true, message: "Doctors found", data: doctors })
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" })

    }
}

export const changeStatus = async (req, res) => {
    const id = req.params.id

    try {
        const changestatus = await Doctor.findByIdAndUpdate(id, { isApproved: 'approved' })
        res.status(200).json({ success: true, message: "Successfully updated", data: changestatus })
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" })
    }
}

export const statusPending = async (req, res) => {
    const id = req.params.id

    try {
        const changestatus = await Doctor.findByIdAndUpdate(id, { isApproved: 'pending' })
        res.status(200).json({ success: true, message: "Successfully updated", data: changestatus })
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" })
    }
}