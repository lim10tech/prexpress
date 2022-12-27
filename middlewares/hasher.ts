import * as crypto from 'crypto';
import {get_value_requiments} from '../utils/get-value-requiments';

type values = {
    save_name?: string;
    hash_key?: string;
    location: string;
    config_key?:string;
    alg?:'sha256'|'sha512'|'sha224'|'sha384'|'md5'|'rmd160'|'sha1'|'RSA-SHA224';
} | string;

var selector = '.';

const __keys = global.__keys.hashes;

function hash_value(options,value) {
    return new Promise<string>((resolve, reject) => {
        var alg = options.alg;
        var key = options.hash_key;
        var hash = crypto.createHmac(alg ? alg : 'sha256', key).update(value).digest("hex");;
        resolve(hash);
    })
}

async function create_hashes(values,req,res,saved_hashes) {
    
    return new Promise<object>((resolve, reject) => {

        var hashes = saved_hashes ? saved_hashes : {};

        values.syncFor(async (option,index,len,next) =>{

            var value_requiments:any = await get_value_requiments(option,__keys,req,res);

            var 
                requiments = value_requiments.requiments,
                value = value_requiments.value,
                data_name = value_requiments.data_name,
                save_name

            var hash = await hash_value(requiments , value);

            if (option.save_name) save_name =  option.save_name;
            if (!option.save_name) save_name =  data_name;

            hashes[save_name] = hash;
            next(); 
            if (index == len) resolve(hashes);
        });
    })
}

export const middleware = (values: values[]) => {

    return async (req, res, next) => {

        var hashes = await create_hashes(values,req,res,res.hashes);
        res.hashes = hashes;
        next();
    }

}

