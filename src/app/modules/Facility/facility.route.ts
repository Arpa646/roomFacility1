import express from "express";
//import { userControllers } from "./user.controller";

import { facilityController } from "./facility.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../Registration/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), facilityController.createFacility);



router.get("/", facilityController.getAllFacility);
router.put("/:id", auth(USER_ROLE.admin), facilityController.updateFacility);



router.delete("/:id", auth(USER_ROLE.admin), facilityController.deleteFacility);
router.get("/:id",facilityController.getSingleFacility);
export const FacilityRoutes = router;
