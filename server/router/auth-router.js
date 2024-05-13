const express=require('express');
const router=express.Router();
const authControllers=require('../controllers/auth-controller');
const {signupSchema,loginSchema}=require("../validators/auth-validator");
const validate=require("../middlewares/validate-middleware");
const authMiddleware=require("../middlewares/auth-middleware");
router.route("/").get(authControllers.home);
// router.route("/register").get(authControllers.register);
// router.route("/register").post(authControllers.register);
router.route("/login").post(validate(loginSchema),authControllers.login);
// --------check-vlidation for registration zod-token----------------
router.route("/register").post(validate(signupSchema),authControllers.register);
// --------we are get user register data in database---------
router.route("/user").get(authMiddleware,authControllers.user);
// -------using router-route------------------
// router.route("/").get((req,res)=>{
//     res.status(200).send("This is express home page using router 2");
// });
// router.route("/register").get((req,res)=>{
//     res.status(200).send("This is express register page using router");
// });
module.exports=router;