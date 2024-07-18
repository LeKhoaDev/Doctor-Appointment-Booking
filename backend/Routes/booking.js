import express from 'express'
import { authenticate } from './../auth/verifyToken.js'
import { deleteBook, getCheckoutSession } from '../Controllers/bookingController.js'

const router = express.Router();

router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession)
router.delete('/:id', deleteBook)


export default router;