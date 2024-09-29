const router = express.Router();
const GolfCourse = require("../models/GolfCourse");

router.post("/", async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const golfCourse = await GolfCourse.create({
      name,
      location,
      description,
      createdBy: req.user.id,
    });
    res.status(201).json(golfCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const golfCourses = await GolfCourse.find().populate(
      "createdBy",
      "username email"
    );
    res.status(200).json(golfCourses);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const golfCourse = await GolfCourse.findById(req.params.id).populate(
      "createdBy",
      "username email"
    );
    if (!golfCourse) {
      return res.status(404).json({ error: "Golf Course not found" });
    }
    res.status(200).json(golfCourse);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, location, contact } = req.body;
    let golfCourse = await GolfCourse.findById(req.params.id);
    if (!golfCourse) {
      return res.status(404).json({ error: "Golf Course not found" });
    }

    golfCourse.name = name || golfCourse.name;
    golfCourse.location = location || golfCourse.location;
    golfCourse.description = contact || golfCourse.contact;

    await golfCourse.save();
    res.status(200).json(golfCourse);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const golfCourse = await GolfCourse.findById(req.params.id);
    if (!golfCourse) {
      return res.status(404).json({ error: "Golf Course not found" });
    }

    await golfCourse.remove();
    res.status(200).json({ message: "Golf Course removed" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
