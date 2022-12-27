type values_type = {
    cookie_key:string;
    cookie_val:any;
    expires:string|number|'no_expires';
}

export const middleware = (values: values_type[]) => {

    return async (req, res, next) => {

        values.syncFor(async (value,index,len,next_object) =>{

            var expires:number;

            if(typeof value.expires == 'string'){

                try {
                    var timeout:number = Number(value.expires.slice(0, -1));
                } catch (error) {
                    return console.error(`[midpack] \x1b[31m${value.expires} değeri geçersizdir.`);
                }

                const ms = 1000;
                const h = 3600;

                switch (value.expires[value.expires.length-1]) {
                    case 's':
                        expires = ms * timeout;
                        break;
                    case 'm':
                        expires = (ms* 60) * timeout;
                        break;
                    case 'h':
                        expires = (ms* h) * timeout;
                        break;
                    case 'd':
                        expires = ((ms * h)*24) * timeout;

                        break;
                    case 'm':
                        expires = (((ms * h)*24)*30) * timeout;
                        break;
                    case 'y':
                        expires = ((((ms * h)*24)*30)*12) * timeout;
                        break;
                    default:
                        return console.error(`[midpack] \x1b[31m${value.expires} değeri geçersizdir.`);
                        break;
                    }

            }else{
                expires = value.expires
            }

            var val;
            try {val = eval(value.cookie_val);} catch (error) {} 
            if (!val) {
                if (req.method == 'POST') val = req.body[value.cookie_val];
                if (req.method == 'GET') val = req.query[value.cookie_val];
            }

            res.cookie(value.cookie_key, val ? val : value.cookie_val , {
                expires: new Date (Date.now() +  expires)
            });

            next_object();
            if (index == len)  next();
        });   

    }

}