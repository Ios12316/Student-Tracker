const express = require("express");
require("dotenv").config();
const connectDB = require("./db");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
connectDB();
app.use(cookieParser())
app.use(logger);
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});