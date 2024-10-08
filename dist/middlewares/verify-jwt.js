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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const verifyJWT = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) ||
            req.cookies.accessToken ||
            req.body.accessToken;
        if (!token) {
            throw Error("Unauthorized user");
        }
        const user = jsonwebtoken_1.default.verify(token, secrets_1.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        next(new ApiError_1.default({
            statusCode: 401,
            message: error.message,
            success: "fail",
        }));
    }
});
exports.default = verifyJWT;
