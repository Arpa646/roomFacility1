"use strict";
// import express from 'express';
// import { userControllers } from './user.cntroller';
// import Request from 'express';
// import Response from 'express';
// import NextFunction from 'express';
// import {AnyZodObject} from 'zod'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatereq = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync(req.body); // Validate req.body against the schema
            next(); // Proceed to the next middleware or route handler
        }
        catch (err) {
            next(err); // Pass the error to the next middleware
        }
    });
};
exports.default = validatereq;
