import express from 'express';
//import { userControllers } from './user.controller';

//import { facilityController } from './facility.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Registration/user.constant';
import { checkSlotController } from './availableslot.controller';


const router = express.Router();


 router.get('/', checkSlotController.checkslot);


export const slotRoutes = router;
