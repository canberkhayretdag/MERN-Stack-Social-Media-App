const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");


var cors = require('cors');
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(cookieParser());


const port = 3003

dotenv.config();

// Database connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, async () =>
	console.log('connected to DB!')
);

app.use(express.json());

// Routes Comes Here
const authRoute = require('./routes/auth')
const messageRoute = require('./routes/message')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)


app.listen(port, () => {
    console.log('live!!!')
})