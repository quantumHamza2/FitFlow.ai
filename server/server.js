require('dotenv').config();
const { validateEnvironment } = require('./config/validateEnvironment');
process.env.SALT = String(validateEnvironment(process.env));
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks"); 



app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 8080;
connection().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}).catch(() => {
  console.error("Could not connect to MongoDB. Check MONGO_URI and database availability.");
  process.exitCode = 1;
});
