import express from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import swapRoute from "./swap.route";

const router = express.Router()

router.get('/check', (req, res) => res.send('API is alive'))

router.use('/user', userRoute)
router.use('/auth', authRoute)
router.use('/swap', swapRoute)

export default router
