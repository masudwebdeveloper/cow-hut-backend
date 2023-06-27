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
exports.OrderService = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const cow_model_1 = require("../cow/cow.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_model_1 = require("./order.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = payload;
    const orderCow = yield cow_model_1.Cow.findById(cow);
    if (orderCow) {
        if (orderCow.label === 'sold out') {
            throw new ApiError_1.default(400, 'This cow is already sold out');
        }
    }
    let orderData = null;
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // Get the buyer and cow documents within the transaction
        const buyerData = yield user_model_1.User.findById(buyer);
        const cowData = yield cow_model_1.Cow.findById(cow);
        //check this cow already sold out
        if ((cowData === null || cowData === void 0 ? void 0 : cowData.label) === 'sold out') {
            throw new ApiError_1.default(400, 'This cow is already sold out');
        }
        const totalBudget = Number(buyerData === null || buyerData === void 0 ? void 0 : buyerData.budget);
        const totalPrice = Number(cowData === null || cowData === void 0 ? void 0 : cowData.price);
        //check buyer budget
        if (totalBudget < totalPrice) {
            throw new Error('Insufficient funds. Please add more money to your account.');
        }
        if (cowData) {
            yield cow_model_1.Cow.findByIdAndUpdate(cowData._id, { label: 'sold out' }, { new: true });
        }
        const remainingMoney = totalBudget - totalPrice;
        if (buyerData) {
            yield user_model_1.User.findByIdAndUpdate(buyerData._id, { budget: remainingMoney.toString() }, { new: true });
        }
        const seller = yield user_model_1.User.findById(cowData === null || cowData === void 0 ? void 0 : cowData.seller).session(session);
        let totalIncome = Number(seller === null || seller === void 0 ? void 0 : seller.income);
        totalIncome += totalPrice;
        if (seller) {
            yield user_model_1.User.findByIdAndUpdate(seller._id, {
                income: totalIncome.toString(),
            }, { new: true });
        }
        const order = yield order_model_1.Order.create([payload], { session });
        orderData = order[0];
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
    if (!orderData) {
        throw new ApiError_1.default(500, 'Failed to create order.');
    }
    else {
        orderData = yield order_model_1.Order.findById(orderData._id)
            .populate('cow')
            .populate('buyer');
    }
    return orderData;
});
const getOrders = (paginationOptions, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const skip = (page - 1) * limit;
    const verifiedToken = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.access);
    if (!verifiedToken) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'invalid token');
    }
    const { id, role } = verifiedToken;
    let cow = null;
    if (role === 'seller') {
        cow = yield cow_model_1.Cow.find({ seller: id });
    }
    const cowId = cow === null || cow === void 0 ? void 0 : cow.map(item => item._id);
    const findCondition = role === 'admin' ? {} : role === 'buyer' ? { buyer: id } : { cow: cowId };
    const result = yield order_model_1.Order.find(findCondition)
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .populate('buyer')
        .sort(sortBy)
        .skip(skip)
        .limit(limit);
    const total = result.length;
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.access);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'invalid token');
    }
    const { id: buyerId } = verifiedToken;
    const result = yield order_model_1.Order.findOne({ _id: id, buyer: buyerId })
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .populate('buyer');
    return result;
});
exports.OrderService = {
    createOrder,
    getOrders,
    getOrder,
};
