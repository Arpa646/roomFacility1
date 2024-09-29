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
exports.facilityController = exports.getSingleFacility = void 0;
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const facility_services_1 = require("./facility.services");
const facility_validation_1 = require("./facility.validation");
const http_status_codes_1 = require("http-status-codes");
const createFacility = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { facility: facilityData } = req.body;
    console.log(facilityData);
    const validationResult = facility_validation_1.facilityValidationSchema.safeParse(facilityData);
    console.log(validationResult);
    if (!validationResult.success) {
        // Collect validation errors
        const validationErrors = validationResult.error.errors.map((error) => ({
            path: Array.isArray(error.path) ? error.path.join(".") : error.path,
            message: error.message,
        }));
        // Return validation errors as JSON response
        return res.status(400).json({
            success: false,
            errors: validationErrors,
        });
    }
    const result = yield facility_services_1.facilityServices.createFacilityIntoDB(facilityData);
    console.log(result);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "facility created  succesfully",
        data: result,
    });
}));
const getAllFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield facility_services_1.facilityServices.getAllFacilityFromDB();
        if (result && result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: "Facility are retrieved succesfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
// Get single facility by ID
const getSingleFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get the facility ID from request params
        console.log(id);
        const facility = yield facility_services_1.facilityServices.getFacilityByIdFromDB(id);
        if (!facility) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Facility not found",
                data: null,
            });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Facility retrieved successfully",
            data: facility,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server error",
                error: err.message,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Unknown server error",
            });
        }
    }
});
exports.getSingleFacility = getSingleFacility;
const deleteFacility = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("this is id", id);
    try {
        const result = yield facility_services_1.facilityServices.deleteFacilityInDB(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                message: "No Data Found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Facility deleted successfully",
            data: result,
        });
    }
    catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error deleting facility",
                error: error.message,
            });
        }
        else {
            // Handle unexpected error types
            res.status(500).json({
                success: false,
                message: "Error deleting facility",
                error: "An unexpected error occurred.",
            });
        }
    }
}));
const updateFacility = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const result = yield facility_services_1.facilityServices.updateFacilityInDB(id, updateData);
    console.log("up", result);
    if (!result) {
        return res.status(404).json({
            success: false,
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Facility updated successfully",
        data: result,
    });
}));
exports.facilityController = {
    createFacility,
    getAllFacility,
    updateFacility,
    deleteFacility,
    getSingleFacility: exports.getSingleFacility,
};
