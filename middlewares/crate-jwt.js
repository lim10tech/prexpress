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
var jwt = require("jsonwebtoken");
var get_color_1 = require("../utils/get-color");
var __keys = global.__keys;
var __errors = global.__errors;
function create_payload(payload_datas, req, res) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var payload = {};
        if (!payload_datas.length) {
            var i = 0;
            var length = Object.keys(payload_datas).length;
            for (var key in payload_datas) {
                var value;
                try {
                    value = eval(payload_datas[key]);
                }
                catch (error) { }
                if (!value) {
                    if (req.method == 'POST')
                        value = req.body[payload_datas[key]];
                    if (req.method == 'GET')
                        value = req.query[payload_datas[key]];
                }
                payload[key] = value ? value : payload_datas[key];
                i++;
                if (length == i) {
                    resolve(payload);
                }
            }
        }
        else {
            payload_datas.syncFor(function (data, index, len, next) { return __awaiter(_this, void 0, void 0, function () {
                var value, data_name;
                return __generator(this, function (_a) {
                    try {
                        value = eval(data);
                    }
                    catch (error) { }
                    data_name = data.split('.').at(-1);
                    if (!value) {
                        if (req.method == 'POST')
                            value = req.body[data];
                        if (req.method == 'GET')
                            value = req.query[data];
                    }
                    payload[data_name] = value;
                    next();
                    if (index == len)
                        resolve(payload);
                    return [2 /*return*/];
                });
            }); });
        }
    });
}
var middleware = function (options) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var payload_datas, token_name, jwt_key, values, payload, token_name, key, token, jwt_tokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    values = options;
                    if (values.length) {
                        payload_datas = values;
                        token_name = 'auth_token';
                    }
                    else {
                        payload_datas = values.payload_datas;
                        token_name = values.token_name;
                        jwt_key = values.jwt_key;
                    }
                    return [4 /*yield*/, create_payload(payload_datas, req, res)];
                case 1:
                    payload = _a.sent();
                    token_name = token_name ? token_name : 'auth_token';
                    if (!jwt_key) {
                        if (token_name) {
                            key = __keys.jwts[token_name];
                        }
                        else {
                            key = __keys.jwts['auth_token'];
                        }
                    }
                    else {
                        key = jwt_key;
                    }
                    if (!key) {
                        console.error("[midpack] ".concat(get_color_1.color.FgRed).concat(token_name, " isimli jwt i\u00E7in bir key atanmam\u0131\u015F.").concat(get_color_1.color.Reset));
                        return [2 /*return*/, res.status(500).json({
                                msg: __errors.server_error,
                                status: false,
                                code: 500,
                                data: {}
                            })];
                    }
                    token = jwt.sign(payload, key);
                    if (!res.jwt) {
                        jwt_tokens = {};
                        res.jwt = jwt_tokens;
                    }
                    res.jwt[token_name] = token;
                    next();
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.middleware = middleware;
