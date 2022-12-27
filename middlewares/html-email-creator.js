"use strict";
exports.__esModule = true;
exports.middleware = void 0;
var node_html_parser_1 = require("node-html-parser");
var fs_1 = require("fs");
var selector = '.';
var middleware = function (values) {
    return function (req, res, next) {
        var html;
        try {
            var data = (0, fs_1.readFileSync)(process.cwd() + '\\' + values.html);
            html = "".concat(data);
        }
        catch (error) {
            html = values.html;
        }
        var root = (0, node_html_parser_1.parse)(html);
        for (var key in values.html_values) {
            var id = key;
            try {
                var value = eval(values.html_values[key]);
            }
            catch (error) { }
            if (!value) {
                value = req.body[values.html_values[key]];
            }
            if (!value) {
                value = values.html_values[key];
            }
            root.getElementById(id).innerHTML = value;
        }
        if (!res.html) {
            res.html = {};
        }
        var save_name = values.save_name;
        res.html[save_name] = {};
        res.html[save_name].html = root.getElementById('email_html').innerHTML;
        res.html[save_name].subject = root.getElementById('subject').innerHTML;
        res.html[save_name].text = root.getElementById('text').innerHTML;
        next();
    };
};
exports.middleware = middleware;
