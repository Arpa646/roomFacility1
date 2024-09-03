"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegModel = void 0;
const mongoose_1 = require("mongoose"); // Added import for `model`
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
    address: { type: String, required: true },
}, {
    timestamps: true,
});
// userSchema.pre('save', async function (next) {
//   const UserRegModel = this as IUser & Document; // Explicitly typing the context
//   try {
//     // Hash the password before saving, if it is modified
//     if (UserRegModel.isModified('password')) {
//       if (typeof UserRegModel.password === 'string') {
//         UserRegModel.password = await bcrypt.hash(UserRegModel.password, 10);
//       } else {
//         throw new Error('Password must be a string');
//       }
//     }
//     next();
//   } catch (error) {
//     next(error as CallbackError); // Cast the error to the appropriate type
//   }
// });
exports.UserRegModel = (0, mongoose_1.model)("User", userSchema);
