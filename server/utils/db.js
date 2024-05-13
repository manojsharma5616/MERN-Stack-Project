const mongoose = require("mongoose");
// const URI="mongodb://127.0.0.1:27017/mern_admin";
// const URI="mongodb+srv://manojkumarsh9782:omcVEXd4KR5IDxlg@cluster0.ioqpyu2.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";
const URI=process.env.MONGODB_URI;
mongoose.connect(URI);
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database connection succefully");
  } catch (error) {
    console.error("database connection failed");
    console.log(error);
    process.exit(0);
  }
};
module.exports = connectDb;
