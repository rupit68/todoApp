const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rupit:rupit1401@cluster0.ugwcr9o.mongodb.net/"
    );
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

conn();
