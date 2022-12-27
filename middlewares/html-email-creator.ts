import {get_value} from '../utils/get-value';
import { parse } from 'node-html-parser';
import { readFileSync } from "fs";

type values_type = {
    html:string,
    save_name:string,
    html_values:object
}

var selector = '.';

export const middleware = (values:values_type) => {
    
    return function (req,res,next) {
        
        var html:string;
        
        try {
            var data = readFileSync(process.cwd()+ '\\' + values.html);
            html = `${data}`;
        } catch (error) {
            html = values.html;
        }
        var root = parse(html);

        for (const key in values.html_values) {
            let id:string = key;
            try {var value = eval(values.html_values[key]);} catch (error) {}
            if (!value) {
                value = req.body[values.html_values[key]]
            }
            if (!value) {
                value = values.html_values[key]
            }
            root.getElementById(id).innerHTML = value;
        }

        if (!res.html) {
            res.html = {}
        }
        
        var save_name = values.save_name;

        res.html[save_name] = {};
        res.html[save_name].html = root.getElementById('email_html').innerHTML;
        res.html[save_name].subject = root.getElementById('subject').innerHTML;
        res.html[save_name].text = root.getElementById('text').innerHTML;

        next();
    }

}