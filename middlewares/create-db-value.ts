type values_type = {
    schema:any,
    values:{},
    response?:{
        status_code?:number,
        msg:string,
        response_values?:{},
    } | string
}

function create_data(values,req,res) {
    return new Promise((resolve, reject) => {
        var datas = {};
        var i = 0;
        var length = Object.keys(values.query_values).length;
        for (const key in values.values) {
            var value
            try {value = eval(values.values[key]);} catch (error) {}
            datas[key] = value ? value : values.values[key];
        }
        i++;
        if (length == i){
            resolve(datas);
        }
    });
}

export const middleware = (values:values_type) => {
    return async (req,res,next) => {
        var datas = await create_data(values ,req,res);
        var schema = new values.schema(datas);
        schema.save();
        if (values.response) {
            return res.status(200).json(
                {
                    msg:values.response,
                    status:true,
                    code:200
                }
            );
        }
        next();
    }
}