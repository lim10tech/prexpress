function get_requiments(requiments,config_data) {
    return new Promise<any>((resolve, reject) => {
        var i = 0;
        var length = Object.keys(config_data).length;
        for (const key in config_data) {
            if (!requiments[key]) requiments[key] = config_data[key];
            i++;
            if (length == i){
                resolve(requiments);
            }
        } 
    })
}

export function get_value_requiments(data,config,req,res) {

    return new Promise<object>(async (resolve, reject) => {

        var value, data_name, requiments;

        if (typeof data == 'string'){
            try {value = eval(data);} catch (error) {} // verninin kendisi alınıyor
            data_name = data.split('.').at(-1); // verinin ismi alıyor
            requiments = config[data_name]; // config üzerindeki gereksinimleri alınıyor
        }
    
        if (typeof data == 'object'){
            try {value = eval(data.location);} catch (error) {} // verninin kendisi alınıyor
            data_name = data.location.split('.').at(-1); // verinin ismi alıyor
            requiments = data; // parametre olarak gönderilen gerekisinler atanıyor
            var config_data = config[data.config_key]; // config üzerindeki gereksinimleri alınıyor
            if(!config_data) config_data = config[data_name]; // config üzerindeki gereksinimlerinin anahtarı belirtilmemiş ise ver ismi ile deneniyor
            requiments = await get_requiments(requiments,config_data);
        };
    
        if (!value) {
            if (req.method == 'POST') value = req.body[data_name];
            if (req.method == 'GET') value = req.query[data_name];
        }
        
        resolve({requiments,value,data_name});
    })
}