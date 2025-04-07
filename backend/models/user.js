const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "List",
    },
  ],
});
module.exports = mongoose.model("User", userschema);
