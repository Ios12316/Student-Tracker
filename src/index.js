const express = require("express");
require("dotenv").config();
const connectDB = require("../db");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
connectDB();
app.use(logger);
app.use(express.json());
app.use(studentRoutes);
app.use("/courses", courseRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
