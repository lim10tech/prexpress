import {get_value} from '../utils/get-value';

type values_type = {
    status_code?:number,
    msg:string,
    response_values?:{},
} | string

var selector = '.';

export function response(values:values_type){

    return async function(req,res) {
        
        var response_values = {};
        var status_code;
        var msg;
        
        if (typeof values == 'object') {
            if (values.response_values) {
                for (const key in values.response_values) 
                {
                    response_values[key] = get_value(values.response_values[key],{req,res});
                }
            }
            status_code = values.status_code ? values.status_code : 200;
        }

        return res.status(status_code ? status_code : 200).json(
            {
                msg:typeof values == 'object' ? values.status_code : values,
                status:true,
                code:status_code ? status_code : 200,
                data:response_values    
            }
        );

    }
}

export function set_config(selector_c: string) {
    selector = selector_c;
}