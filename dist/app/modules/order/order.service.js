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
const getOrders = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const skip = (page - 1) * limit;
    const result = yield order_model_1.Order.find()
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .populate('cow')
        .populate('buyer');
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
exports.OrderService = {
    createOrder,
    getOrders,
};
