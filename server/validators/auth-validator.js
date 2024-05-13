const { z } = require("zod");
// Creating an object schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invaild Email Address" })
    .min(12, { message: "Email must be at least of 12 chars." })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 chars. " })
    .max(1024, { message: "Name must not be more than 1024 characters" }),
});
// -----------first-way to define signupSchema with help of loginSchema-------
// const signupSchema = loginSchema.extend({
//   username: z
//     .string({ required_error: "Name is required" })
//     .trim()
//     .min(3, { message: "Name must be at least of 3 chars. " })
//     .max(255, { message: "Name must not be more than 255 characters" }),
//   phone: z
//     .string({ required_error: "Phone is required" })
//     .trim()
//     .min(10, { message: "Phone must be at least of 10 chars. " })
//     .max(15, { message: "Phone must not be more than 15 characters" }),
// });
// --------second-way to signupSchema------------
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 chars. " })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(12, { message: "Email must be at least of 12 chars." })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 chars. " })
    .max(15, { message: "Phone must not be more than 15 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 chars. " })
    .max(1024, { message: "Name must not be more than 1024 characters" }),
});
module.exports = { signupSchema, loginSchema };
