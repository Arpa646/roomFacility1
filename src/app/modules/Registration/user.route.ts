import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import uservalidateSchema from "./user.validation";
import validatereq from "../../middleware/validateroute";

const router = express.Router();

router.post(
  "/signup",

  userControllers.createUser
);
router.get("/", auth(USER_ROLE.admin), userControllers.getAllUser);

export const UserRoutes = router;
