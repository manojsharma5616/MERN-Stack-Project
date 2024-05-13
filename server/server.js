require("dotenv").config();
const express = require("express");
const app = express();
const cors=require('cors');
// const router = require("./router/auth-router");
const authRoute = require("./router/auth-router");
const contactRoute=require("./router/contact-router");
const serviceRoute=require("./router/service-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
// ------admindasboard-----------------
const adminRoute=require("./router/admin-router");
//---let's takle cors and store registered form data in datatbase---
const corsOptions={
  origin:"http://localhost:5173",
  methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials:true
}
app.use(cors(corsOptions));
// -----------------json-middleware-----------------------
app.use(express.json());
// app.use("/api/auth", router);
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin",adminRoute);
// app.use("/",router);
// --------------------------------------------------
// app.get("/",(req,res)=>{
//     res.status(200).send("My name is manoj");
// })
// app.get("/register",(req,res)=>{
//     res.status(200).send("Welcome to register page");
// })
app.use(errorMiddleware);
const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server listen on port http://127.0.0.1:${PORT}`);
  });
});