const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
const Joi = require("joi");
app.use(bodyParser.json());
app.use(express.static("public"));
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
app.use(express.static("public"));
app.use(express.json());
const mongoose = require("mongoose");
let currentUser;
console.log("server loaded");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/about.html", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});
app.get("/faq.html", (req, res) => {
  res.sendFile(__dirname + "/faq.html");
});
app.get("/orders.html", (req, res) => {
  res.sendFile(__dirname + "/orders.html");
});
app.get("/contact.html", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});
console.log("server app get");
mongoose
  .connect(
    "mongodb+srv://doylemr:tr3D7lUfsErph7se@cluster0.afz2cbd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
console.log("server mongoose connected");

const beefSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: String,
  phoneNum: String,
  chuckRoast: String,
  shoulderRoast: String,
  Brisket: String,
  flankSteak: String,
  skirtSteak: String,
  triTip: String,
  ribeyeBoneIn: String,
  ribeyeBoneOut: String,
  shortRibsBoneIn : String,
  beefStew: String,
  shanks: String,
  TBone: String,
  tenderloinFilet: String,
  newYorkStrip: String,
  sirloinBoneIn: String,
  sirloinBoneOut: String,
  sirloinTipRoast: String,
  topRoundRoast: String,
  bottomRoundRoast: String,
  cubedSteak: String,
  groundBeef: String,
  organMeat: String
});
console.log("server beefSchema");

app.get('/api/beefSheet', async (req, res) => {
  getBeefSheet(res);
});
console.log("server app get");


const getBeefSheet = async () => {
  try {
    return (await fetch("http://localhost:3000/api/beefSheet")).json();
  } catch (error) {
    console.error("Error fetching beef sheet:", error);
  }
};
let beef;
console.log(beef);
beef = "some value";

console.log("server getBeefSheet");

app.post("/api/beefSheet", upload.single("img"), (req, res) => {
  console.log("In post");
  const result = validateBeef(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const beef = new beef({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    date: req.body.date,
    phoneNum: req.body.phoneNum,
    chuckRoast: req.body.chuckRoast,
    shoulderRoast: req.body.shoulderRoast,
    Brisket: req.body.Brisket,
    flankSteak: req.body.flankSteak,
    skirtSteak: req.body.skirtSteak,
    triTip: req.body.triTip,
    ribeyeBoneIn: req.body.ribeyeBoneIn,
    ribeyeBoneOut: req.body.ribeyeBoneOut,
    shortRibsBoneIn : req.body.shortRibsBoneIn,
    beefStew: req.body.beefStew,
    shanks: req.body.shanks,
    TBone: req.body.TBone,
    tenderloinFilet: req.body.tenderloinFilet,
    newYorkStrip: req.body.newYorkStrip,
    sirloinBoneIn: req.body.sirloinBoneIn,
    sirloinBoneOut: req.body.sirloinBoneOut,
    sirloinTipRoast: req.body.sirloinTipRoast,
    topRoundRoast: req.body.topRoundRoast,
    bottomRoundRoast: req.body.bottomRoundRoast,
    cubedSteak: req.body.cubedSteak,
    groundBeef: req.body.groundBeef,
    organMeat: req.body.organMeat
  });
  createBeefSheet(beef, res);
});
console.log("server post");
const beefSheet = mongoose.model("Beef Sheet", beefSchema);

const createBeefSheet = async (beef, res) => {
  const result = await beef.save();
  res.send(result); //what i changed
};
console.log("server createBeefSheet");

app.post("/api/beefSheet", upload.single("img"), (req, res) => {
  const result = validateBeef(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
});
console.log("server post pt 2");

const beefSheetMod = mongoose.model("Beef Sheet");

const validateBeef = (beef) => {
  const schema = Joi.object({
    firstName: Joi.allow(""),
    lastName: Joi.allow(""),
    email: Joi.allow(""),
    date: Joi.allow(""),
    phoneNum: Joi.allow(""),
    chuckRoast: Joi.allow(""),
    shoulderRoast: Joi.allow(""),
    Brisket: Joi.allow(""),
    flankSteak: Joi.allow(""),
    skirtSteak: Joi.allow(""),
    triTip: Joi.allow(""),
    ribeyeBoneIn: Joi.allow(""),
    ribeyeBoneOut: Joi.allow(""),
    shortRibsBoneIn : Joi.allow(""),
    beefStew: Joi.allow(""),
    shanks: Joi.allow(""),
    TBone: Joi.allow(""),
    tenderloinFilet: Joi.allow(""),
    newYorkStrip: Joi.allow(""),
    sirloinBoneIn: Joi.allow(""),
    sirloinBoneOut: Joi.allow(""),
    sirloinTipRoast: Joi.allow(""),
    topRoundRoast: Joi.allow(""),
    bottomRoundRoast: Joi.allow(""),
    cubedSteak: Joi.allow(""),
    groundBeef: Joi.allow(""),
    organMeat: Joi.allow("")
  });

  return schema.validate(beef);
};
console.log("server validateBeef");

app.post("/api/signup", async (req, res) => {
    const result = validateUser(req.body);
    console.log(result);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
    if (!(await validateUnique(res, req.body.username))) {
      return;
    }
  
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  
    await user.save();
    res.send("success");
  });
  
  app.post("/api/login", async (req, res) => {
    const result = validateLoginUser(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    const user = await User.findOne({ username: req.body.username });
  
    if (!user) {
      return res.status(400).send("Username not found");
    }
  
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).send("Incorrect Password!");
  
    currentUser = user;
    res.send("Success");
  });
  
  const validateUnique = async (res, username) => {
    const user = await User.findOne({ username: username });
  
    if (user) {
      res.status(400).send("Error duplicate user");
      return false;
    }
    return true;
  };
  
  const validateUser = (user) => {
    const schema = Joi.object({
      username: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
  
    return schema.validate(user);
  };
  
  const validateLoginUser = (user) => {
    const schema = Joi.object({
      username: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    });
  
    return schema.validate(user);
  };
  
  app.listen(3000, () => {
    console.log("I'm listening");
  });