const nodemailer = require("nodemailer");
import {get_value} from '../utils/get-value';

type values_type = {
    reciver_email:string;
    html:string;
}

type mail_config = {
    port?:number,
    host?:string,
    service?: string,
    secure?:boolean,
    auth:{
        user:string,
        pass:string
    }
    from:string
}

async function send_email(transporter,to:string,subject:string,text:string,html:string,from){

    await transporter.sendMail({
        from,to,subject,text,html
    });
}

export class Emailer {

    private transporter:any
    private from:any

    constructor(config:mail_config){
        this.from = config.from;
        this.transporter = nodemailer.createTransport(config);
    }
    send(values: values_type) {
        return async (req, res, next) => {
            var reciver_email = get_value(values.reciver_email ,{req,res});
            if (!reciver_email) {
                req.body[reciver_email]
            }
            var email = get_value(values.html,{req,res});
            if (!email) {
                email = res.html[values.html]
            }
            send_email(this.transporter,reciver_email,email.subject,email.text,email.html,this.from);
            next();
        }
    }
}

const transporter = nodemailer.createTransport(global.__email)

export function emailer(values: values_type) {
    return async (req, res, next) => {
        var reciver_email = get_value(values.reciver_email ,{req,res});
        if (!reciver_email) { 
            reciver_email = req.body[values.reciver_email];
        }
        var email_data = get_value(values.html,{req,res});
        if (!email_data) {
            email_data = res.html[values.html];
        }
        send_email(
            transporter,
            reciver_email,
            email_data.subject,
            email_data.text,
            email_data.html,
            global.__email.from
        );
        next();
    }
}