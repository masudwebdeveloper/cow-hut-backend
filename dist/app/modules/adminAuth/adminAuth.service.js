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
exports.AdminAuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("../admin/admin.model");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const adminAuthLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isAdminExist = yield admin_model_1.Admin.findOne({ phoneNumber }).select({
        password: 1,
        role: 1,
    });
    console.log(isAdminExist);
    //check admin have or not
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "admin can't found !");
    }
    if ((isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password) &&
        !(yield admin_model_1.Admin.isPasswordMatch(password, isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password doesn't match");
    }
    const { id, role } = isAdminExist;
    const accessToken = jwtHelper_1.jwtHelper.createToken({
        id,
        role,
    }, config_1.default.jwt.access, { expiresIn: config_1.default.jwt.expires_in });
    const refeshToken = jwtHelper_1.jwtHelper.createToken({
        id,
        role,
    }, config_1.default.jwt.refesh, { expiresIn: config_1.default.jwt.refesh_expires_in });
    return {
        accessToken,
        refeshToken,
    };
});
const refeshTokenAdminAuth = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.refesh);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'invalid refresh token');
    }
    const { id } = verifiedToken;
    const isAdminExist = yield admin_model_1.Admin.findOne({ _id: id });
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'admin does not exist');
    }
    const { id: adminId, role } = isAdminExist;
    const newAccessToken = jwtHelper_1.jwtHelper.createToken({
        id: adminId,
        role,
    }, config_1.default.jwt.access, { expiresIn: config_1.default.jwt.expires_in });
    return { accessToken: newAccessToken };
});
exports.AdminAuthService = {
    adminAuthLogin,
    refeshTokenAdminAuth,
};
