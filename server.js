require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/uploads"));
connectDB();

app.use("/resume", express.static(path.join(process.cwd(), "resume")));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/jobs", jobRoutes);
app.use("/companies", companyRoutes);
app.use("/profile", profileRoutes);
app.use("/", resumeRoutes);
app.use("/locations", locationRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
