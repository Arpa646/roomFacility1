

// import express from 'express';
// import { userControllers } from './user.cntroller';
// import Request from 'express';
// import Response from 'express';
// import NextFunction from 'express';
// import {AnyZodObject} from 'zod'


// const validatereq=(schema:anyZodObject)=>{




//     return async(req:Request,res:Response,next:NextFunction)=>{
//        try{
//       await schema.parseAsync({
//             body:req.body
//         })
//            next()
//        }
//        catch(err)
//        {
//         next(err)
//        }
        
      
    
//     }
//     }
//     export default validatereq









import { Request, Response, NextFunction } from 'express'; // Correctly import types from express
import { AnyZodObject } from 'zod'; // Ensure correct import for Zod schema

const validatereq = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body); // Validate req.body against the schema
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      next(err); // Pass the error to the next middleware
    }
  };
};

export default validatereq;
