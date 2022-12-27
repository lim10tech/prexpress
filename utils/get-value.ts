const selector = '.';

export function get_value(value_location:string , objects:{req:any,res:any}) {

    var location
        
    if (typeof value_location == 'string') {
        location = value_location.split(selector);
    }else{
        return undefined
    }
    var test_value;
    if (location[0] == 'req') {
        test_value = objects.req;
    }
    if (location[0] == 'res') {
        test_value = objects.res;
    }
    location.splice(0, 1);
    location.forEach(location => {
        test_value = test_value[location]
    });
    
    return test_value;
    


}