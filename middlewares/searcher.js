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
var create_query_1 = require("../utils/create-query");
var middleware = function (values) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, page_per_item, page, result, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_query_1.create_query)(values, req, res, values.regex)];
                case 1:
                    query = _a.sent();
                    console.log(query);
                    if (typeof values.page_per_item == 'number') {
                        page_per_item = values.page_per_item;
                    }
                    if (typeof values.page_per_item == 'string') {
                        try {
                            page_per_item = eval(values.page_per_item);
                        }
                        catch (error) { }
                        if (!page_per_item) {
                            if (req.method == 'POST')
                                page_per_item = req.body[values.page_per_item];
                            if (req.method == 'GET')
                                page_per_item = req.query[values.page_per_item];
                        }
                    }
                    if (typeof values.page == 'number') {
                        page = values.page;
                    }
                    if (typeof values.page == 'string') {
                        try {
                            page = eval(values.page);
                        }
                        catch (error) { }
                        if (!page) {
                            if (req.method == 'POST')
                                page = req.body[values.page];
                            if (req.method == 'GET')
                                page = req.query[values.page];
                        }
                    }
                    return [4 /*yield*/, values.schema.find(query, values.select_values).limit(page_per_item).skip(page_per_item * (page - 1))];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, values.schema.count({ $and: [query] })];
                case 3:
                    count = _a.sent();
                    res[values.save_value_key] = {
                        result: result,
                        page: page,
                        result_count: count,
                        page_count: Math.ceil(count / page_per_item)
                    };
                    next();
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.middleware = middleware;
