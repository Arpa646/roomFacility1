import { object, string, z } from "zod";

const userValidationSchema = object({
  name: string().min(6, { message: "Name must be at least 6 characters long" }),
  email: string().email({ message: "Invalid email address" }),
  password: string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  phone: string().min(1, { message: "Phone number is required" }),
  role: z
    .enum(["admin", "user"], {
      message: 'Role must be either "admin" or "user"',
    })
    .default("user"),
  address: string().min(1, { message: "Address is required" }),
});

export default userValidationSchema;

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
