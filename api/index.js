const express = require("express");
const userRoutes = require("./routes/user.route");
require("./models/user.model");
require("./db");

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.listen(8000, () => console.log("Listening at port 8000!"));
