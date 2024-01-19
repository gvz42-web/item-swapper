import app from './config/express'
import config from './config/config'
import mongoose from "./config/mongoose";

app.listen(config.port, () => {
  console.info(`API started on port ${config.port}`)
})

mongoose()

export default app
