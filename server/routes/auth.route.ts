import express from "express";
import {create, login} from "../controllers/user.controller";

const router = express.Router()

router.post('/register', (req, res) => {
  create(req.body)
    .then((user) => res.send(user))
    .catch(err => res.send(err))
})

router.post('/login', (req, res) => {
  login(req.body)
    .then((user) => res.send({token: user.token}))
    .catch(err => res.status(401).send(err))
})

export default router
