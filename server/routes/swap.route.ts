import express from "express";
import code from "../utils/code";

const router = express.Router()

router.get('/code', (req, res) => {
  res.send({ code: code()})
})

export default router
