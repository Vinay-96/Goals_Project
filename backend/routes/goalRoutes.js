const express = require("express");
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");
const router = express.Router();

const { protect } = require("../middleware/authMiddelware");

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").delete(protect, deleteGoals).put(protect, updateGoals);

// router.get("/", getGoals);

// router.post("/", setGoals);

// router.put(`/:id`, updateGoals);

// router.delete("/:id", deleteGoals);

module.exports = router;
