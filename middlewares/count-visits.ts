import {writeFile , readFileSync} from 'fs';

type values_Type = {
    save_name?:string;
    save_visit_count?:boolean;
}

var selector = '.';
var visits = {};

export const middleware = (values?:values_Type) => {
    
    return async function (req,res,next) {

        if (values && values.save_visit_count) {

            var visits_values = JSON.parse(`${readFileSync('./db/visits.json')}`);
            
            if (visits_values[req.url] != undefined ) {
                visits_values[req.url] = visits_values[req.url] + 1;
            }else{
                visits_values[req.url] = 0;
            }

            visits = visits_values[req.url];
            
            writeFile('./db/visits.json' ,JSON.stringify(visits_values),() => {});
        
        }else{
            if(!visits[req.url]) visits[req.url] = 0;
            visits[req.url]++;            
        }
        
        var save_name;

        if (values && values.save_name) {
            save_name = values.save_name;
        }else{
            save_name = 'visits'
        }
        res[save_name] = visits[req.url];
        next();

    }

}

export function set_config(selector_c:string) {
    selector = selector_c;
}