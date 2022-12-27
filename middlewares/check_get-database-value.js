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
var get_value_1 = require("../utils/get-value");
var create_query_1 = require("../utils/create-query");
var middleware = function (values) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, select, finded_data, exist, invalid_values, key, i, length, key, new_value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_query_1.create_query)(values, req, res, values.regex)];
                case 1:
                    query = _a.sent();
                    console.log(query);
                    if (typeof values.get_finded_data == 'object') {
                        try {
                            select = eval(select);
                        }
                        catch (error) { }
                        if (select) {
                            select = values.get_finded_data.select_values ? values.get_finded_data.select_values : '';
                        }
                    }
                    if (!(typeof values.schema == 'string')) return [3 /*break*/, 2];
                    try {
                        finded_data = eval(values.schema);
                    }
                    catch (error) { }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, values.schema.findOne(query, select)];
                case 3:
                    finded_data = _a.sent();
                    _a.label = 4;
                case 4:
                    if (values.error_type == 'is_exist')
                        exist = true;
                    if (values.error_type == 'is_notexist')
                        exist = false;
                    if (typeof values.get_finded_data == 'string')
                        res[values.get_finded_data] = finded_data;
                    if (typeof values.get_finded_data == 'object')
                        res[values.get_finded_data.data_name] = finded_data;
                    if ((finded_data != undefined || finded_data != null) == exist) {
                        invalid_values = [];
                        if (exist) {
                            for (key in values.query_values) {
                                if (finded_data[key] == (0, get_value_1.get_value)(values.query_values[key], { req: req, res: res }) || finded_data[key] == req.body[values.query_values[key]]) {
                                    invalid_values.push(values.query_values[key].split('.').at(-1));
                                }
                            }
                        }
                        return [2 /*return*/, res.status(400).json({
                                msg: values.error_message ? values.error_message : (exist ? 'Zaten kullanılmış değerler.' : 'Değerler bulunamadı.'),
                                status: false,
                                code: 400,
                                data: { invalid_values: invalid_values }
                            })];
                    }
                    if (!exist && values.replace_data) {
                        i = 0;
                        length = Object.keys(values.replace_data).length;
                        for (key in values.replace_data) {
                            try {
                                new_value = eval(values.replace_data[key]);
                            }
                            catch (error) {
                            }
                            if (!new_value) {
                                new_value = req.body[values.replace_data[key]];
                            }
                            if (!(!new_value && values.no_set_undefined) || typeof new_value == 'boolean') {
                                if (new_value == "delete-value" && values.no_set_undefined) {
                                    finded_data[key] = undefined;
                                }
                                else {
                                    if (typeof new_value == 'boolean') {
                                        finded_data[key] = new_value;
                                    }
                                    else {
                                        finded_data[key] = new_value ? new_value : values.replace_data[key];
                                    }
                                }
                            }
                            ;
                            i++;
                            if (length == i) {
                                finded_data.save();
                            }
                        }
                    }
                    if (values.response) {
                        return [2 /*return*/, res.status(200).json({
                                msg: values.response,
                                status: true,
                                code: 200
                            })];
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.middleware = middleware;
