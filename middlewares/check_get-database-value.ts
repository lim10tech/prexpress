import {get_value} from '../utils/get-value';
import {create_query} from '../utils/create-query';

type values_type = {
    schema:any,
    query_values?:{},
    error_type?:'is_exist'|'is_notexist',
    query_type?:string,
    error_message?:string,
    get_finded_data?:{
        data_name:string,
        select_values?:string
    } | string,
    no_set_undefined?:boolean,
    replace_data?:object,
    response?:{
        status_code?:number,
        msg:string,
        response_values?:{},
    } | string,
    regex?:boolean
}


export const middleware = (values:values_type) => {
    
    return async (req,res,next) => {

        var query:any =  await create_query(values,req,res,values.regex);
        console.log(query);
        var select:any;
        
        if (typeof values.get_finded_data == 'object'){ 
            try {select = eval(select);} catch (error) {}
            if (select) {
                select = values.get_finded_data.select_values ? values.get_finded_data.select_values : '';
            }
        }
        
        var finded_data;

        if (typeof values.schema == 'string') {
            try {finded_data = eval(values.schema)} catch (error) {}
        }else{            
            finded_data = await values.schema.findOne(query , select);
        }
        
        var exist;

        if (values.error_type == 'is_exist') exist = true;
        if (values.error_type == 'is_notexist') exist = false;   
        if (typeof values.get_finded_data == 'string') res[values.get_finded_data] = finded_data;
        if (typeof values.get_finded_data == 'object') res[values.get_finded_data.data_name] = finded_data;

        if ((finded_data != undefined || finded_data != null) == exist) {
            var invalid_values:string[] = [];
            if (exist) {
                for (const key in values.query_values) {
                    if (finded_data[key] ==  get_value(values.query_values[key],{req,res}) || finded_data[key] == req.body[values.query_values[key]]) {
                        invalid_values.push(<string>values.query_values[key].split('.').at(-1));
                    }
                }   
            }
            return res.status(400).json(
                {
                    msg:values.error_message ? values.error_message :(exist ? 'Zaten kullanılmış değerler.' : 'Değerler bulunamadı.'),
                    status:false,
                    code:400,
                    data:{invalid_values:invalid_values}
                }
            );
        }

        if (!exist && values.replace_data) {
            var i = 0;
            var length = Object.keys(values.replace_data).length;
            for (const key in values.replace_data) {  
                var new_value ;
                try {new_value = eval(values.replace_data[key]);} catch (error) {
                    
}
                if (!new_value) {
                    new_value = req.body[values.replace_data[key]];
                }
                if (!(!new_value && values.no_set_undefined) || typeof new_value == 'boolean'){
                    if (new_value == "delete-value" && values.no_set_undefined) {
                        finded_data[key] = undefined;
                    }else{
                        if (typeof new_value == 'boolean') {
                            finded_data[key] = new_value
                        }else{
                            finded_data[key] = new_value ? new_value : values.replace_data[key];
                        }
                    }
                };
                i++;
                if (length == i){
                    finded_data.save();
                }
            }
        }
       
        if (values.response) {
            return res.status(200).json(
                {
                    msg:values.response,
                    status:true,
                    code:200
                }
            );
        }
        next();
    }
}