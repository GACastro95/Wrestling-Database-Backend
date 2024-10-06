const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const wrestlersRoute = require("./routes/database/wrestler");
const promotionsRoute = require("./routes/database/promotion");
const eventsRoute = require("./routes/database/event");
const userRoute = require("./routes/database/user");
const reviewRoute = require("./routes/database/review");
const listRoute = require("./routes/database/list");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/twdb");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use("/wrestlers", wrestlersRoute);
app.use("/promotions", promotionsRoute);
app.use("/events", eventsRoute);
app.use("/user", userRoute);
app.use("/review", reviewRoute);
app.use("/list", listRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
