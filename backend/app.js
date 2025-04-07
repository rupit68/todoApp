// const express = require("express");
// const app = express();
// const auth = require("./routes/auth");
// require("./conn/conn");

// app.get("/", (req, res) => {
//   res.send("Rupit");
// });

// app.use("/api", auth);

// app.listen(1000, () => {
//   console.log("Server Started");
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/auth");
const list = require("./routes/list");
app.use("/api", userRoutes);
app.use("/api/v", list);
mongoose
  .connect("mongodb+srv://rupit:rupit1401@cluster0.ugwcr9o.mongodb.net/")
  .then(() => console.log("Database Connected"))
  .catch((error) => console.error("Database Connection Error:", error));

app.listen(1000, () => {
  console.log("Server running on port 1000");
});
