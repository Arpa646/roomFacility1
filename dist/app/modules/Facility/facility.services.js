"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityServices = exports.getFacilityByIdFromDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const facility_model_1 = __importDefault(require("./facility.model"));
const createFacilityIntoDB = (facilityData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield facility_model_1.default.create([facilityData], { session });
        yield session.commitTransaction();
        session.endSession();
        return newUser;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await FacilityModel.find();
    const result = yield facility_model_1.default.find({ isDeleted: false });
    return result;
});
// services/facilityServices.ts
// Fetch single facility by ID from the database
const getFacilityByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.default.findOne({ _id: id, isDeleted: false });
    return result;
});
exports.getFacilityByIdFromDB = getFacilityByIdFromDB;
// const updateFacilityInDB = async (id, updateData) => {
//   const facility = await FacilityModel.findByIdAndUpdate(id, updateData, {
//     new: true,
//     runValidators: true,
//   });
//   return facility;
// };
const updateFacilityInDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield facility_model_1.default.findByIdAndUpdate(id, productData, {
        new: true,
    });
    // if (!result) {
    //   throw new Error("No data Found");
    // }
    console.log(result);
    return result;
});
const deleteFacilityInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //const result1 = await FacilityModel.findOne(_id: id)
    // console.log('this is data',result1)
    const result = yield facility_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    // if (!result) {
    //   throw new Error("No data Found");
    // }
    return result;
});
exports.facilityServices = {
    createFacilityIntoDB,
    getAllFacilityFromDB,
    updateFacilityInDB,
    deleteFacilityInDB,
    getFacilityByIdFromDB: exports.getFacilityByIdFromDB
};
