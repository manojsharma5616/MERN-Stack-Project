const bcrypt = require("bcrypt");
// ------------user-model.js-----------------
const User = require("../models/user-model");
const home = async (req, res) => {
  try {
    res
      .status(200)
      .send({ Message: "This is express home page using router 2" });
  } catch (error) {
    res.status(500).send("Initail Server Error");
  }
};
// ---------User-Registration logic-----------
const register = async (req, res) => {
  try {
    console.log(req.body);
    // res.status(200).json({Messsage:"This is express register page using router"});
    // res.status(200).json({Messsage:req.body});
    // another way to print data
    // const data=req.body;
    // res.status(200).json({data});

    // -------------------user-model.js---------------
    const { username, email, phone, password } = req.body;
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res.status(400).json({ Message: "email alerady exists" });
    }
    //--------------------hash password-----------
    // const salt_round=10;
    // const hash_password=await bcrypt.hash(password,salt_round);
    // const userCreated = await User.create({ username, email, phone, password:hash_password });
    const userCreated = await User.create({ username, email, phone, password });
    // res.status(201).json({ userCreated });
    // ---------jwt token---------
    res.status(201).json({
      // msg: userCreated,
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("Initial Server Error");
  }
};
// ---------User-Login logic--------------------
const login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const userExit = await User.findOne({ email: email });
    console.log("userExit", userExit);
    if (!userExit) {
      return res.status(400).json({ Message: "Invalid Credatinals" });
    }
    // const validUser= await bcrypt.compare(password,userExit.password);
    const validUser = await userExit.comparePassword(password);
    if (validUser) {
      res.status(200).json({
        msg: "login successfully",
        token: await userExit.generateToken(),
        userId: userExit._id.toString(),
      });
    } else {
      return res.status(401).json({ Message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json("Initial Server Error");
  }
};
// -----to send user data - user logic lecture-31------
const user = async (req, res) => {
  try {
    // res.status(200).json({msg:"hii user"});
    const userData = req.user;
    console.log(userData);
    // res.status(200).json({msg:userData});
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};
module.exports = { home, register, login, user };
