import * as jwt from 'jsonwebtoken';
import { color } from '../utils/get-color';

type values_type = {
    payload_datas:object,
    jwt_key?,
    token_name?:string
}  

const __keys = global.__keys;
const __errors = global.__errors;

function create_payload(payload_datas,req,res) {
    return new Promise<object>((resolve, reject) => {
        var payload = {};
        if (!payload_datas.length) {
            var i = 0;
            var length = Object.keys(payload_datas).length;
            for (const key in payload_datas) { 
                var value;
                try {
                    value = eval(payload_datas[key]);
                } catch (error) {}
                if (!value) {
                    if (req.method == 'POST') value = req.body[payload_datas[key]];
                    if (req.method == 'GET') value = req.query[payload_datas[key]];
                }
                payload[key] = value ? value : payload_datas[key];
                i++;
                if (length == i){
                    resolve(payload);
                }
            }   
        }else{

            payload_datas.syncFor(async (data,index,len,next) =>{
                try {var value = eval(data);} catch (error) {}
                var data_name = data.split('.').at(-1);

                if (!value) {
                    if (req.method == 'POST') value = req.body[data];
                    if (req.method == 'GET') value = req.query[data];
                }

                payload[data_name] = value;
                next();
                if (index == len) resolve(payload);

            })
        }
    })
}

export const middleware =  (options:values_type | string[]) => {

    return async (req,res,next) => {
        
        var payload_datas;
        var token_name;
        var jwt_key;
        var values:any = options;

        if (values.length) {
            payload_datas = values;
            token_name = 'auth_token';

        }else{
            payload_datas = values.payload_datas; 
            token_name = values.token_name;
            jwt_key = values.jwt_key
        }

        var payload = await create_payload(payload_datas ,req,res);
        var token_name = token_name ? token_name : 'auth_token';
        var key;

        if (!jwt_key) {
            if (token_name) {
                key =  __keys.jwts[token_name];
            }else{
                key = __keys.jwts['auth_token'];
            }
        }else{
            key = jwt_key;
        }


        if (!key) {
            console.error(`[midpack] ${color.FgRed}${token_name} isimli jwt için bir key atanmamış.${color.Reset}`);
            return res.status(500).json(
                {
                    msg:__errors.server_error,
                    status:false,
                    code:500,
                    data:{}
                }
            );
        }
        
        var token = jwt.sign(payload, key);

        if (!res.jwt) {
            var jwt_tokens = {};
            res.jwt = jwt_tokens;
        }
        
        res.jwt[token_name] = token;
        next();
    }
}