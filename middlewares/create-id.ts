type values_type =  {
    length?:number, 
    data_name:string,
    transform?:'uppercase'|'lowercase',
    chars?:string,
};

function makeid(config) {
    return new Promise<string>((resolve, reject) => {
        var result           = '';
        var characters       = config.chars ? config.chars :  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        var charactersLength = characters.length;
        var length = config.length ? config.length : Math.floor(Math.random() * 95) +5
        for ( var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            if (i == length -1) {
                if (config.transform  == 'uppercase') {
                    result = result.toUpperCase();
                }
                if (config.transform == 'lowercase') {
                    result = result.toLowerCase();
                }
                resolve(result);
            }
        }
    })
}

const __values_req = global.__values_req;

function create_ids(values,ids) {

    var ids = ids ? ids : {};

    return new Promise<object>((resolve, reject) => {

        values.syncFor(async (value,index,len,next) =>{
            
            var id_options;

            if (typeof value == 'string') {
                if (typeof __values_req[value] == "object") {
                    id_options = __values_req[value];
                }
                if (typeof __values_req[value] == "number") {
                    id_options = {length:__values_req[value]};
                }
            }
        
            if (typeof value == 'object') {
                id_options = value;
                var id_config = __values_req[value.data_name];
                for (const key in id_config) {
                    if (!value[key]) {
                        id_options[key] = id_config[key]
                    }
                }
            }

            var id = await makeid(id_options);
            ids[value.data_name ? value.data_name : value] = id;
            
            next();
            if (index == len) resolve(ids);
        
        });  
    })
}

export var middleware = (values:values_type[] | string[]) => {

    return async (req,res,next) => {

        var ids = await create_ids(values,res.ids);
        res.ids = ids;

        next();
        
    }
}