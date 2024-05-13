const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
//--------define the hash password------------
userSchema.pre("save", async function (next) {
  console.log("pre method",this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const salt_round = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt_round);
    user.password = hash_password;
    next();
  } catch (error) {
    next(error);
  }
});
// ---------------generate JWT token------------------
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;  
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};
// -----------bcript password for login-----------------
userSchema.methods.comparePassword= async function(password) {
  return bcrypt.compare(password, this.password);
};
// define the model or the collection name
const User = mongoose.model("User", userSchema);
module.exports = User;