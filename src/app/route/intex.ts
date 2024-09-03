import express from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/Registration/user.route';
import { FacilityRoutes } from '../modules/Facility/facility.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { slotRoutes } from '../modules/CheckAvailable/availableslot.route';


const router=express.Router()



const modulerRoutes=[

    {
        path:'/auth',
        route:UserRoutes,
        
    },
    {
        path:'/auth',
        route:AuthRoutes,
        
    },
    {
        path:'/facility',
        route:FacilityRoutes,
        
    },
    {
        path:'/bookings',
        route:BookingRoutes,
        
    },
    {
        path:'/check-availability',
        route:slotRoutes,
        
    },
 
]

modulerRoutes.forEach(route=>router.use(route.path,route.route))

export default router