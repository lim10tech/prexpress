"use strict";
exports.__esModule = true;
exports.config_parse = void 0;
var fs_1 = require("fs");
var config_parse = function (config) {
    var config_data = {};
    var config_location = config;
    try {
        var config_buff = (0, fs_1.readFileSync)("".concat(config_location));
        if (config.endsWith(".json")) {
            config_data = JSON.parse("".concat(config_buff));
        }
        else if (config.endsWith(".env")) {
            var config_1 = "".concat(config_buff);
            var config_values = config_1.split('\n');
            config_values.forEach(function (config_value) {
                try {
                    if (config_value.length == 0) {
                        return;
                    }
                    var config_2 = config_value.split('=');
                    var val;
                    if (config_2[1].split('"').length == 3) {
                        val = config_2[1].split('"')[1];
                    }
                    else if (config_2[1].split("'").length == 3) {
                        val = config_2[1].split("'")[1];
                    }
                    else {
                        val = config_2[1];
                    }
                    config_data[config_2[0]] = val;
                }
                catch (error) {
                }
            });
        }
    }
    catch (error) {
        try {
            var dir = (0, fs_1.readdirSync)("".concat(config_location));
            console.log(dir);
        }
        catch (error) {
        }
    }
    return config_data;
};
exports.config_parse = config_parse;
