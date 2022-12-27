import {create_query} from '../utils/create-query';

type values_type = {
    schema:any,
    query_values:object,
    page_per_item?:string | number,
    page?:string | number,
    query_type?: string,
    select_values?:string,
    save_value_key?
    regex?:boolean
}

export const middleware = (values:values_type) => {

    return async (req, res, next) => {

        var query = await create_query(values,req,res,values.regex);
        console.log(query);
        var page_per_item;
        var page;

        if (typeof values.page_per_item == 'number') {
            page_per_item = values.page_per_item;
        }
        if (typeof values.page_per_item == 'string') {
            try {page_per_item = eval(values.page_per_item)} catch (error) {}
            if (!page_per_item) {
                if (req.method == 'POST') page_per_item = req.body[values.page_per_item];
                if (req.method == 'GET') page_per_item = req.query[values.page_per_item];
            }
        }
        
        if (typeof values.page == 'number') {
            page = values.page;
        }
        if (typeof values.page == 'string') {
            try {page = eval(values.page)} catch (error) {}
            if (!page) {
                if (req.method == 'POST') page = req.body[values.page];
                if (req.method == 'GET') page = req.query[values.page];
            }
        }

        var result = await values.schema.find(query,values.select_values).limit(page_per_item).skip(page_per_item*(page-1));
        var count = await values.schema.count({$and:[query]});

        res[values.save_value_key] = {
            result,
            page,
            result_count:count,
            page_count:Math.ceil(count / page_per_item),
        };
        next();
    }
}