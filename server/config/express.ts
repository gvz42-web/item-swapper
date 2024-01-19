import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import indexRoute from "../routes/index.route";

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'localhost:3000'}));

app.use('/', indexRoute)

export default app
