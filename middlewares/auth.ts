import * as jwt from 'jsonwebtoken';
import { color } from '../utils/get-color';

type values_type = {
    return_error?:boolean,
    jwt_location?:string,
    jwt_key?:string,
    config_key_name?:string
    data_save_name?:string,
    auth_status_dataname?:string,
    db_check?:{
        vals:{},
        schema:any
    }
}

var __errors = global.__errors;
const __keys = global.__keys;

function create_query(values,user_data) {
    return new Promise<any>((resolve, reject) => {
        var query =  {};
        query['$and'] = [];
        var i = 0;
        var length = Object.keys(values.db_check.vals).length;
        for (const key in values.db_check.vals) {
            let qdata = {};
            qdata[key] = user_data[key];
            query['$and'].push(qdata);
            i++;
            if (length == i){
                resolve(query);
            }
        }
    })
}

export const middleware = (values:values_type) => {

    return async (req,res,next) => {

        try {
            
            var key;
            var token;
            
            if (values.jwt_location) {
                token = eval(values.jwt_location);
            }else{
                token = req.headers.authorization;
            }
            
            if (token.indexOf('Bearer') != -1) {
                token = token.split(' ')[1]
            }

            if (!values.jwt_key) {
                key = __keys.jwts[<any>values.config_key_name] ? __keys.jwts[<any>values.config_key_name] : __keys.jwts['auth_token'];
            }else{
                key = values.jwt_key;
            }
            if (!key) {
                console.error(`[midpack] ${color.FgRed}Jwt key için hiçbir değer okunamadı. ${color.Reset}`);
            }


            var user_data = jwt.verify(token,key);

            if (values.auth_status_dataname) res[values.auth_status_dataname] = true;
            if (!values.auth_status_dataname) res['auth'] = true;

        
            if (values.db_check) {

                var query = await create_query(values,user_data);
                console.log(query);                

                var finded_data = await values.db_check.schema.findOne(query);
                
                if (!finded_data) {
                    return res.status(401).json(
                        {
                            msg:__errors.auth,
                            status:false,
                            code:401,
                            data:{}
                        }
                    );
                }
                if (values.data_save_name) res[values.data_save_name] = finded_data;
            }else{
                if (values.data_save_name) res[values.data_save_name] = user_data;
            }

            next();

        } catch (error) {

            if (values.return_error || values.return_error == null) {
                return res.status(401).json(
                    {
                        msg:__errors.auth,
                        status:false,
                        code:401,
                        data:{}
                    }
                );
            }

            if (values.auth_status_dataname) res[values.auth_status_dataname] = false;
            if (!values.auth_status_dataname) res['auth'] = false;
            next();
            
        }
    }

}