import express from "express";
import {authenticateToken} from "../middleware/jwt.middleware";
import {getById} from "../controllers/user.controller";

const router = express.Router()

router.get('/', authenticateToken,(req, res) => {

  getById(res.locals.user)
    .then(user => res.send(user))
    .catch(err => res.send(err))
})

export default router
