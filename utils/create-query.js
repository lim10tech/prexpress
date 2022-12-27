"use strict";
exports.__esModule = true;
exports.create_query = void 0;
function create_query(values, req, res, regex) {
    return new Promise(function (resolve, reject) {
        var query = {};
        //query tipi oluşturuluyor
        var type;
        if (values.query_type == 'or' || values.query_type == 'and') {
            type = values.query_type;
        }
        else {
            try {
                type = eval(values.query_type);
            }
            catch (error) { }
            if (!type) {
                if (!type) {
                    if (req.method == 'POST')
                        type = req.body[values.query_type];
                    if (req.method == 'GET')
                        type = req.query[values.query_type];
                }
                if (type != 'or' && type != 'and') {
                    type = 'and';
                }
            }
        }
        //query tipi oluşturuluyor
        query['$' + type] = [];
        var i = 0;
        var length = Object.keys(values.query_values).length;
        for (var key in values.query_values) {
            var test_value;
            var value_key = values.query_values[key];
            try {
                test_value = eval(value_key);
            }
            catch (error) { }
            if (!test_value) {
                if (req.method == 'POST')
                    test_value = req.body[value_key];
                if (req.method == 'GET')
                    test_value = req.query[value_key];
            }
            var qdata = {};
            if (regex) {
                qdata[key] = new RegExp(test_value ? test_value : values.query_values[key], 'g');
            }
            else {
                qdata[key] = test_value ? test_value : values.query_values[key];
            }
            query['$' + type].push(qdata);
            i++;
            if (length == i) {
                resolve(query);
            }
        }
    });
}
exports.create_query = create_query;
