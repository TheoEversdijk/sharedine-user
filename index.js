import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import usersRouter from "./routes/usersRouter.js";
dotenv.config({path: '.env'})

const domainsFromEnv = process.env.CORS_DOMAINS || ""
const port = process.env.PORT || 3001

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

const app = express();

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => res.status(200).send("ShareDine UserAPI"))

app.use('/users', cors(), usersRouter)

// app.listen(port, () => {
//     console.log(`Listening on ${port}`)
// })

app.listen(3001)

