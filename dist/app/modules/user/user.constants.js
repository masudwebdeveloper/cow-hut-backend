"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchableFields = exports.userFilterableFields = exports.role = void 0;
exports.role = ['seller', 'buyer'];
exports.userFilterableFields = [
    'searchTerm',
    'role',
    'phoneNumber',
    'name',
];
exports.userSearchableFields = [
    'role',
    'name.firstName',
    'name.lastName',
    'phoneNumber',
];
