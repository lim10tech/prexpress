"use strict";
exports.__esModule = true;
exports.get_value = void 0;
var selector = '.';
function get_value(value_location, objects) {
    var location;
    if (typeof value_location == 'string') {
        location = value_location.split(selector);
    }
    else {
        return undefined;
    }
    var test_value;
    if (location[0] == 'req') {
        test_value = objects.req;
    }
    if (location[0] == 'res') {
        test_value = objects.res;
    }
    location.splice(0, 1);
    location.forEach(function (location) {
        test_value = test_value[location];
    });
    return test_value;
}
exports.get_value = get_value;
