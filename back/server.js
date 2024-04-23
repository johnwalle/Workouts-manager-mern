const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const workoutRouter = require("./router/workoutRouter");
const userRouter = require("./router/userRouter");
require("dotenv").config();
require('colors');


const app = express();


// MIddlewares
app.use(cors());
app.use(express.json());
app.use('/api/workouts', workoutRouter)
app.use('/api/users', userRouter)
// Connecting with the database
connectDB();

//routes

const port = process.env.PORT || 8000;
app.listen(port, () => {

    console.log(`The server is running on port ${port}`.cyan)

}
)