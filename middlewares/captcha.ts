const fetch = require('node-fetch');
const { stringify } = require('querystring');

type values_type = {
    captcha_key?:string,
    location:string
} | string;

const keys = global.__keys;

export const middleware = (values?:values_type) => {

    return async (req,res,next) => {

        var captcha;
        var captcha_key;

        if (typeof values == 'object') {
            var captcha;
            try {captcha = eval(values.location);} catch (error) {}
            captcha_key = values.captcha_key;
        }else{
            if (values) captcha = req.body[values]
            if (!values) captcha = req.body.captcha
            captcha_key = keys['captcha'];
        }

        if (!captcha)
            return res.status(401).json(
                {
                    msg:"Robot doğrulaması başarısız.",
                    status:false,
                    code:401,
                    data:{}
                }
            );

        const query = stringify({
            secret: captcha_key,
            response: captcha,
            remoteip: req.connection.remoteAddress
        });

        const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

        const body = await fetch(verifyURL).then(res => res.json());

        if (body.success !== undefined && !body.success)
            return res.status(401).json(
                {
                    msg:"Robot doğrulaması başarısız.",
                    status:false,
                    code:401,
                    data:{}
                }
            );

        next();

    }

}

