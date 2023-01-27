import express from "express";
import connectDB from "./db/connectdb.js";
import web from "./routes/web.js"
import cors from 'cors'
const app = express()
app.use(cors())

const port = process.env.PORT || '8000'
connectDB('party');

// json
app.use(express.json())

// load Routes
app.use("/api", web)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})