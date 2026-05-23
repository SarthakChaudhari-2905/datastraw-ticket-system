const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

connectDB();

app.use(
cors({
origin:"http://localhost:5173"
})
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Support CRM Backend Running");
});

app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});