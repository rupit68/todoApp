const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//create
router.post("/addtask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const checkuser = await User.findById(id);
    if (checkuser) {
      const list = new List({ title, body, user: checkuser });
      await list.save().then(() => {
        res.status(200).json({ list });
      });
      checkuser.list.push(list);
      checkuser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/updatetask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list.save().then(() => {
      res.status(200).json({ message: "task updated" });
    });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/deletetask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const checkuser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (checkuser) {
      await List.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: "task deleted" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/gettask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
