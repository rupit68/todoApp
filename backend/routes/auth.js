const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// sign in
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password, 10);
    const user = new User({ email, username, password: hashpassword });
    await user
      .save()
      .then(() => res.status(200).json({ message: "Sign Up Successful" }));
  } catch (error) {
    res.status(200).json({ message: "User Already Exists" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const checkuser = await User.findOne({ email: req.body.email });

    // If user is not found, return immediately
    if (!checkuser) {
      return res.status(404).json({ message: "Please Sign Up First" });
    }

    const checkpassword = bcrypt.compareSync(
      req.body.password,
      checkuser.password
    );

    // If password is incorrect, return immediately
    if (!checkpassword) {
      return res.status(401).json({ message: "Password Is Not Correct" });
    }

    // Remove password before sending user data
    const { password, ...others } = checkuser._doc;

    return res.status(200).json({ others });
  } catch (error) {
    console.error("Error during signin:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
