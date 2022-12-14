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
exports.get_value_requiments = void 0;
function get_requiments(requiments, config_data) {
    return new Promise(function (resolve, reject) {
        var i = 0;
        var length = Object.keys(config_data).length;
        for (var key in config_data) {
            if (!requiments[key])
                requiments[key] = config_data[key];
            i++;
            if (length == i) {
                resolve(requiments);
            }
        }
    });
}
function get_value_requiments(data, config, req, res) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var value, data_name, requiments, config_data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof data == 'string') {
                        try {
                            value = eval(data);
                        }
                        catch (error) { } // verninin kendisi al??n??yor
                        data_name = data.split('.').at(-1); // verinin ismi al??yor
                        requiments = config[data_name]; // config ??zerindeki gereksinimleri al??n??yor
                    }
                    if (!(typeof data == 'object')) return [3 /*break*/, 2];
                    try {
                        value = eval(data.location);
                    }
                    catch (error) { } // verninin kendisi al??n??yor
                    data_name = data.location.split('.').at(-1); // verinin ismi al??yor
                    requiments = data; // parametre olarak g??nderilen gerekisinler atan??yor
                    config_data = config[data.config_key];
                    if (!config_data)
                        config_data = config[data_name]; // config ??zerindeki gereksinimlerinin anahtar?? belirtilmemi?? ise ver ismi ile deneniyor
                    return [4 /*yield*/, get_requiments(requiments, config_data)];
                case 1:
                    requiments = _a.sent();
                    _a.label = 2;
                case 2:
                    ;
                    if (!value) {
                        if (req.method == 'POST')
                            value = req.body[data_name];
                        if (req.method == 'GET')
                            value = req.query[data_name];
                    }
                    resolve({ requiments: requiments, value: value, data_name: data_name });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.get_value_requiments = get_value_requiments;
