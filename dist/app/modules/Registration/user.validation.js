"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().min(6, { message: "Name must be at least 6 characters long" }),
    email: (0, zod_1.string)().email({ message: "Invalid email address" }),
    password: (0, zod_1.string)().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    phone: (0, zod_1.string)().min(1, { message: "Phone number is required" }),
    role: zod_1.z
        .enum(["admin", "user"], {
        message: 'Role must be either "admin" or "user"',
    })
        .default("user"),
    address: (0, zod_1.string)().min(1, { message: "Address is required" }),
});
exports.default = userValidationSchema;
// import { z } from "zod";
// export const userValidationSchema = z.object({
//   name: z
//     .string()
//     .min(6, { message: "Name must be at least 6 characters long" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters long" }),
//   phone: z.string().min(1, { message: "Phone number is required" }),
//   role: z
//     .enum(["admin", "user"], {
//       message: 'Role must be either "admin" or "user"',
//     })
//     .default("user"),
//   address: z.string().min(1, { message: "Address is required" }),
// });
