const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is live!");
});

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const interviewSessionRoutes = require('./routes/interviewSessionRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/session', interviewSessionRoutes);


module.exports = app;