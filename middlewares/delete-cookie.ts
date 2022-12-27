type values_type = string[]
var selector = '.';

export const middleware = (values: values_type) => {

    return async (req, res, next) => {

        values.syncFor(async (data,index,len,next_object) =>{
            res.clearCookie(data);
            next_object();
            if (index == len) {
                next();
            }
        });
    }

}

export function set_config(selector_c: string) {
    selector = selector_c;
}