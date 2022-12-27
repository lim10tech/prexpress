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
var __errors = global.__errors;
var __keys = global.__keys;
function create_query(values, user_data) {
    return new Promise(function (resolve, reject) {
        var query = {};
        query['$and'] = [];
        var i = 0;
        var length = Object.keys(values.db_check.vals).length;
        for (var key in values.db_check.vals) {
            var qdata = {};
            qdata[key] = user_data[key];
            query['$and'].push(qdata);
            i++;
            if (length == i) {
                resolve(query);
            }
        }
    });
}
var middleware = function (values) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var key, token, user_data, query, finded_data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (values.jwt_location) {
                        token = eval(values.jwt_location);
                    }
                    else {
                        token = req.headers.authorization;
                    }
                    if (token.indexOf('Bearer') != -1) {
                        token = token.split(' ')[1];
                    }
                    if (!values.jwt_key) {
                        key = __keys.jwts[values.config_key_name] ? __keys.jwts[values.config_key_name] : __keys.jwts['auth_token'];
                    }
                    else {
                        key = values.jwt_key;
                    }
                    if (!key) {
                        console.error("[midpack] ".concat(get_color_1.color.FgRed, "Jwt key i\u00E7in hi\u00E7bir de\u011Fer okunamad\u0131. ").concat(get_color_1.color.Reset));
                    }
                    user_data = jwt.verify(token, key);
                    if (values.auth_status_dataname)
                        res[values.auth_status_dataname] = true;
                    if (!values.auth_status_dataname)
                        res['auth'] = true;
                    if (!values.db_check) return [3 /*break*/, 3];
                    return [4 /*yield*/, create_query(values, user_data)];
                case 1:
                    query = _a.sent();
                    console.log(query);
                    return [4 /*yield*/, values.db_check.schema.findOne(query)];
                case 2:
                    finded_data = _a.sent();
                    if (!finded_data) {
                        return [2 /*return*/, res.status(401).json({
                                msg: __errors.auth,
                                status: false,
                                code: 401,
                                data: {}
                            })];
                    }
                    if (values.data_save_name)
                        res[values.data_save_name] = finded_data;
                    return [3 /*break*/, 4];
                case 3:
                    if (values.data_save_name)
                        res[values.data_save_name] = user_data;
                    _a.label = 4;
                case 4:
                    next();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    if (values.return_error || values.return_error == null) {
                        return [2 /*return*/, res.status(401).json({
                                msg: __errors.auth,
                                status: false,
                                code: 401,
                                data: {}
                            })];
                    }
                    if (values.auth_status_dataname)
                        res[values.auth_status_dataname] = false;
                    if (!values.auth_status_dataname)
                        res['auth'] = false;
                    next();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
exports.middleware = middleware;
