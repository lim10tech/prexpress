import {readFileSync,readdirSync} from 'fs';

export const config_parse = (config:string) =>   {

    var config_data = {};

    var config_location = config;

    try {

        var config_buff:any = readFileSync(`${config_location}`);

        if(config.endsWith(".json")){
            config_data = JSON.parse(`${config_buff}`);
        }
        
        else if(config.endsWith(".env")){
    
            let config:string = `${config_buff}`;
            var config_values = config.split('\n');
    
            config_values.forEach(config_value => {
                try {
    
                    if (config_value.length == 0) {
                        return
                    }
    
                    let config = config_value.split('=');
                    var val;
                    if(config[1].split('"').length == 3){
                        val = config[1].split('"')[1];
                    }
                    else if(config[1].split("'").length == 3){
                        val = config[1].split("'")[1];
                    }else{
                        val = config[1];
                    }
                    config_data[config[0]] = val;
                } catch (error) {
                }
                
            });
        }

    } catch (error) {
        
        try {
            var dir:any = readdirSync(`${config_location}`);    
            console.log(dir);
        } catch (error) {

        }

    }

    

    return config_data;
    
}