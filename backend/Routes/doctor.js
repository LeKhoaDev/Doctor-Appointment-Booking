import express from 'express'
import { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctors, getDoctorProfile, getAllDoctorsAdmin, changeStatus, statusPending } from '../Controllers/doctorController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
import reviewRouter from './review.js'


const router = express.Router()

// nested route
router.use('/:doctorId/reviews', reviewRouter)

router.get('/:id', getSingleDoctor)
router.get('/', getAllDoctors)
router.get('/all/doctor', getAllDoctorsAdmin)
router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor)
router.put('/change/status/:id', changeStatus)
router.put('/pending/status/:id', statusPending)
router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor)

router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile)

export default router;