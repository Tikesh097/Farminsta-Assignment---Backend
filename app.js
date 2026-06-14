const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/users",userRoutes);

module.exports = app;
