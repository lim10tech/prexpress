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
var middleware = function (values) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            values.syncFor(function (value, index, len, next_object) { return __awaiter(void 0, void 0, void 0, function () {
                var expires, timeout, ms, h, val;
                return __generator(this, function (_a) {
                    if (typeof value.expires == 'string') {
                        try {
                            timeout = Number(value.expires.slice(0, -1));
                        }
                        catch (error) {
                            return [2 /*return*/, console.error("[midpack] \u001B[31m".concat(value.expires, " de\u011Feri ge\u00E7ersizdir."))];
                        }
                        ms = 1000;
                        h = 3600;
                        switch (value.expires[value.expires.length - 1]) {
                            case 's':
                                expires = ms * timeout;
                                break;
                            case 'm':
                                expires = (ms * 60) * timeout;
                                break;
                            case 'h':
                                expires = (ms * h) * timeout;
                                break;
                            case 'd':
                                expires = ((ms * h) * 24) * timeout;
                                break;
                            case 'm':
                                expires = (((ms * h) * 24) * 30) * timeout;
                                break;
                            case 'y':
                                expires = ((((ms * h) * 24) * 30) * 12) * timeout;
                                break;
                            default:
                                return [2 /*return*/, console.error("[midpack] \u001B[31m".concat(value.expires, " de\u011Feri ge\u00E7ersizdir."))];
                                break;
                        }
                    }
                    else {
                        expires = value.expires;
                    }
                    try {
                        val = eval(value.cookie_val);
                    }
                    catch (error) { }
                    if (!val) {
                        if (req.method == 'POST')
                            val = req.body[value.cookie_val];
                        if (req.method == 'GET')
                            val = req.query[value.cookie_val];
                    }
                    res.cookie(value.cookie_key, val ? val : value.cookie_val, {
                        expires: new Date(Date.now() + expires)
                    });
                    next_object();
                    if (index == len)
                        next();
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    }); };
};
exports.middleware = middleware;
