import * as mongoose from "mongoose";
import config from "./config";


export default function () {
  mongoose.connect(config.db_uri)
    .then(() => console.info('Database connected'))
    .catch((error) => {
      console.error('Database achtung!')
      console.error(error)
    })
}


