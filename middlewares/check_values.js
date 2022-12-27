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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.middleware = void 0;
var get_value_requiments_1 = require("../utils/get-value-requiments");
var __values_req = global.__values_req;
var __errors = global.__errors;
function testtype(types, value) {
    var _this = this;
    var status = false;
    return new Promise(function (resolve, reject) {
        types.syncFor(function (type, index, len, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (type == value) {
                    status = true;
                }
                next();
                if (index == len)
                    resolve(status);
                return [2 /*return*/];
            });
        }); });
    });
}
function test_value(value, requiments) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var len, status, email_regex, result, service, services;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!value) {
                        return [2 /*return*/, resolve({ status: false, msg: 'not_exist' })];
                    }
                    if (!(typeof requiments.type == 'object')) return [3 /*break*/, 2];
                    return [4 /*yield*/, testtype(requiments.type, value)];
                case 1:
                    status = _a.sent();
                    return [2 /*return*/, resolve({ status: status, msg: 'spec_type' })];
                case 2:
                    if (requiments.type == 'email') {
                        try {
                            email_regex = new RegExp('(?<=@)(?<service>.*)(?=\.(com|org|net))', 'g');
                            result = email_regex.exec(value);
                            service = result.groups.service;
                            services = requiments.services;
                            if (services.indexOf(service) == -1) {
                                return [2 /*return*/, resolve({ status: false, msg: 'invalid_service' })];
                            }
                            return [2 /*return*/, resolve({ status: true, msg: 'success' })];
                        }
                        catch (error) {
                            return [2 /*return*/, resolve({ status: false, msg: 'invalid_email' })];
                        }
                    }
                    if (requiments.type)
                        if (typeof value != requiments.type && requiments.type != 'any') {
                            return [2 /*return*/, resolve({ status: false, msg: 'type' })];
                        }
                    if (requiments.type == 'number') {
                        len = value;
                    }
                    else {
                        len = value.length;
                    }
                    if (requiments.length)
                        if (requiments.length != len) {
                            return [2 /*return*/, resolve({ status: false, msg: 'length', type: requiments.type ? requiments.type : typeof value })];
                        }
                    if (requiments.min_length)
                        if (requiments.min_length > len) {
                            return [2 /*return*/, resolve({ status: false, msg: 'min_length', type: requiments.type ? requiments.type : typeof value })];
                        }
                    if (requiments.max_length)
                        if (requiments.max_length < len) {
                            return [2 /*return*/, resolve({ status: false, msg: 'max_length', type: requiments.type ? requiments.type : typeof value })];
                        }
                    return [2 /*return*/, resolve({ status: true, msg: 'success' })];
            }
        });
    }); });
}
function check_values(required_values, req, res) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var invalid_values;
        var _this = this;
        return __generator(this, function (_a) {
            invalid_values = [];
            required_values.syncFor(function (data, index, len, next) { return __awaiter(_this, void 0, void 0, function () {
                var value_data, requiments, value, data_name, result, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, get_value_requiments_1.get_value_requiments)(data, __values_req, req, res)];
                        case 1:
                            value_data = _a.sent();
                            requiments = value_data.requiments, value = value_data.value, data_name = value_data.data_name;
                            return [4 /*yield*/, test_value(value, requiments)];
                        case 2:
                            result = _a.sent();
                            if (!result.status) {
                                if (result.type) {
                                    err = __errors.values[result.type][result.msg];
                                }
                                else {
                                    err = __errors.values[result.msg];
                                }
                                invalid_values.push({
                                    data: data_name,
                                    msg: eval('`' + err + '`')
                                });
                            }
                            next();
                            if (len == index) {
                                resolve(invalid_values);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
var middleware = function (required_values) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var invalid_values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, check_values(required_values, req, res)];
                    case 1:
                        invalid_values = _a.sent();
                        if (invalid_values.length > 0) {
                            return [2 /*return*/, res.status(__errors.invalid_values.status).json({
                                    msg: __errors.invalid_values.msg,
                                    status: false,
                                    code: __errors.invalid_values.status,
                                    data: {
                                        invalid_values: invalid_values //Eksik yada hatalı değerler gönderiliyor.
                                    }
                                })];
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
};
exports.middleware = middleware;
