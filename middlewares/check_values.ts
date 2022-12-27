import {get_value_requiments} from '../utils/get-value-requiments';

type values = {
    type?:'string'|'number'|'bool'|'object'|'any'|'email'|string[];
    location:string;
    max_length?:number;
    min_length?:number;
    length?:number;
    config_key?:string;
    err_null?:boolean;
    regex?:string;
} | string;

var __values_req = global.__values_req;
var __errors = global.__errors;

function testtype(types , value) {
    var status = false;
    return new Promise<boolean>((resolve, reject) => {
        types.syncFor(async (type,index,len,next) =>{
            if (type == value) {
                status = true;
            }
            next();
            if (index == len) resolve(status);
        });
    })
}

function test_value(value,requiments) {

    return new Promise<{status:boolean,msg:string,type?:string}>(async (resolve, reject) => {
        var len;

        if (!value) {
            return resolve({status:false,msg:'not_exist'});
        }

        if (typeof requiments.type == 'object') {
            var status = await testtype(requiments.type , value);
            return resolve({status,msg:'spec_type'});
        }

        if (requiments.type == 'email') {
            try {
                var email_regex:any = new RegExp('(?<=@)(?<service>.*)(?=\.(com|org|net))' , 'g');
                var  result = email_regex.exec(value);
                var service = result.groups.service;
                var services =  requiments.services;
                if (services.indexOf(service) == -1) {
                    return resolve({status:false,msg:'invalid_service'});
                }
                return resolve({status:true,msg:'success'})
            } catch (error) {
                return resolve({status:false,msg:'invalid_email'});
            }
        }

        if (requiments.type) if (typeof value != requiments.type && requiments.type != 'any') {
            return resolve({status:false,msg:'type'});
        }
        
        if (requiments.type == 'number') {
            len = value;
        }else{
            len = value.length
        }

        if (requiments.length) if (requiments.length != len) {
            return resolve({status:false,msg:'length',type:requiments.type ? requiments.type : typeof value});
        }
        
        if (requiments.min_length) if (requiments.min_length > len) {
            return resolve({status:false,msg:'min_length',type:requiments.type ? requiments.type : typeof value});
        }
        
        if (requiments.max_length) if (requiments.max_length < len) {
            return resolve({status:false,msg:'max_length',type:requiments.type ? requiments.type : typeof value});
        }
        
        return resolve({status:true,msg:'success'})
    })
}

function check_values(required_values,req,res) {

    return new Promise<any[]>(async (resolve, reject) => {
        
        var invalid_values:any[] = [];
         
        required_values.syncFor(async (data,index,len,next) =>{
            
            var value_data:any = await get_value_requiments(data,__values_req,req,res);

            var requiments = value_data.requiments,
                value = value_data.value,
                data_name = value_data.data_name;            

            var result = await test_value(value,requiments);


            if (!result.status){
                var err;
                if (result.type) {
                    err = __errors.values[result.type][result.msg];
                }else{
                    err = __errors.values[result.msg];
                }
                invalid_values.push({
                    data:data_name,
                    msg:eval('`' + err + '`'),
                });
            }
            next();         
            if (len == index) {resolve(invalid_values)}
        })
    });
}

export const middleware = (required_values:values[]) => {
    
    return async function (req,res,next) {

        var invalid_values  :any = await check_values(required_values,req,res);

        if (invalid_values.length > 0) {
            return res.status(__errors.invalid_values.status).json(
                {
                    msg:__errors.invalid_values.msg,
                    status:false,
                    code:__errors.invalid_values.status,
                    data:{
                        invalid_values  //Eksik yada hatalı değerler gönderiliyor.
                    }
                }
            );   
        }
        next();
    }
}
