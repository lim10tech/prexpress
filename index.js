"use strict";
exports.__esModule = true;
exports.count_visits = exports.Emailer = exports.emailer = exports.create_html = exports.delete_cookie = exports.db = exports.response = exports.create_id = exports.captcha = exports.jwt = exports.save_cookie = exports.hasher = exports.auth = exports.check_values = void 0;
var config_parse_1 = require("./utils/config-parse");
Array.prototype.syncFor = function (callback) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var index = -1;
        var next = function () {
            index++;
            if (_this.length > index) {
                if (_this.length > 0) {
                    callback(_this[index], index + 1, _this.length, next);
                }
            }
        };
        next();
    });
};
var values_req = (0, config_parse_1.config_parse)("".concat(process.cwd(), "\\config\\requiments.json"));
var keys = (0, config_parse_1.config_parse)("".concat(process.cwd(), "\\config\\keys.json"));
var email = (0, config_parse_1.config_parse)("".concat(process.cwd(), "\\config\\email.json"));
var errors = (0, config_parse_1.config_parse)("".concat(process.cwd(), "\\config\\error_messages.json"));
global.__values_req = values_req;
global.__keys = keys;
global.__errors = errors;
global.__email = email;
/*Middlewares*/
var check_values_1 = require("./middlewares/check_values");
exports.check_values = check_values_1.middleware;
var auth_1 = require("./middlewares/auth");
exports.auth = auth_1.middleware;
var hasher_1 = require("./middlewares/hasher");
exports.hasher = hasher_1.middleware;
var save_cookie_1 = require("./middlewares/save-cookie");
exports.save_cookie = save_cookie_1.middleware;
var crate_jwt_1 = require("./middlewares/crate-jwt");
exports.jwt = crate_jwt_1.middleware;
var captcha_1 = require("./middlewares/captcha");
exports.captcha = captcha_1.middleware;
var create_id_1 = require("./middlewares/create-id");
exports.create_id = create_id_1.middleware;
var send_response_1 = require("./middlewares/send-response");
exports.response = send_response_1.response;
var check_get_database_value_1 = require("./middlewares/check_get-database-value");
var create_db_value_1 = require("./middlewares/create-db-value");
var delete_cookie_1 = require("./middlewares/delete-cookie");
exports.delete_cookie = delete_cookie_1.middleware;
var delete_db_value_1 = require("./middlewares/delete-db-value");
var searcher_1 = require("./middlewares/searcher");
var html_email_creator_1 = require("./middlewares/html-email-creator");
exports.create_html = html_email_creator_1.middleware;
var emailer_1 = require("./middlewares/emailer");
exports.Emailer = emailer_1.Emailer;
exports.emailer = emailer_1.emailer;
var count_visits_1 = require("./middlewares/count-visits");
exports.count_visits = count_visits_1.middleware;
var delete_many_1 = require("./middlewares/delete-many");
/*Middlewares*/
var db = {
    check_get_update: check_get_database_value_1.middleware,
    create: create_db_value_1.middleware,
    delete_value: delete_db_value_1.middleware,
    search: searcher_1.middleware,
    deleteMany: delete_many_1.middleware
};
exports.db = db;
