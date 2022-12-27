import {create_query} from '../utils/create-query';

type values_type = {
    schema:any,
    query_values:{},
    query_type?:string,
    response?:{
        status_code?:number,
        msg:string,
        response_values?:{},
    } | string,
    regex?:boolean
}

export const middleware = (values:values_type) => {
    
    return async (req,res,next) => {

        var query = await create_query(values,req,res,values.regex);
        var count = await values.schema.deleteMany(query);

        if (values.response) {
            return res.status(200).json(
                {
                    msg:values.response,
                    status:true,
                    code:200,
                    data:count
                }
            );
            
        }

        next();

    }
}