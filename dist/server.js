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
/* eslint-disable no-console */
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});
let server;
function dbConected() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)(config_1.default.uri, { autoIndex: true }).then(() => {
                console.log('🛢️ Database is Connected Successfully');
                server = app_1.default.listen(config_1.default.port, () => {
                    console.log(`Cowhut server litening on port ${config_1.default.port}`);
                });
            });
        }
        catch (error) {
            console.error('Mongoose connected error: ', error);
        }
        process.on('unhandledRejection', error => {
            if (server) {
                server.close(() => {
                    console.error(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
dbConected();
process.on('SIGTERM', () => {
    console.log('sigterm is received');
    if (server) {
        server.close();
    }
});
