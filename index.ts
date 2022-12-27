import {config_parse as parser}from './utils/config-parse';

declare global {
    interface Array<T> {
        syncFor(any): Array<T>;
    }
}

Array.prototype.syncFor = function<T>(this: T[], callback: any): any {
    return new Promise<any>((resolve, reject) => {
        let index = -1;
        const next = () => {
            index++;
            if (this.length > index) {
                if (this.length > 0) {
                    callback(this[index], index+1,this.length, next);
                }
            }
        }
        next();
    })
}

var values_req = parser(`${process.cwd()}\\config\\requiments.json`);
var keys = parser(`${process.cwd()}\\config\\keys.json`);
var email = parser(`${process.cwd()}\\config\\email.json`);
var errors = parser(`${process.cwd()}\\config\\error_messages.json`);

global.__values_req = values_req;
global.__keys = keys;
global.__errors = errors;
global.__email = email;

/*Middlewares*/ 
    import {middleware as check_values } from './middlewares/check_values';
    import {middleware as auth } from './middlewares/auth';
    import {middleware as hasher } from './middlewares/hasher';
    import {middleware as save_cookie } from './middlewares/save-cookie';
    import {middleware as jwt } from './middlewares/crate-jwt';
    import {middleware as captcha } from './middlewares/captcha';
    import {middleware as create_id } from './middlewares/create-id';
    import {response} from './middlewares/send-response';
    import {middleware as check_get_update} from './middlewares/check_get-database-value';
    import {middleware as create} from './middlewares/create-db-value';
    import {middleware as delete_cookie} from './middlewares/delete-cookie';
    import {middleware as delete_value} from './middlewares/delete-db-value';
    import {middleware as search} from './middlewares/searcher';
    import {middleware as create_html} from './middlewares/html-email-creator';
    import {Emailer ,emailer} from './middlewares/emailer';
    import {middleware as count_visits} from './middlewares/count-visits';
    import {middleware as deleteMany} from './middlewares/delete-many';
/*Middlewares*/

const db = {
    check_get_update,
    create,
    delete_value,
    search,
    deleteMany
}

export {
    check_values,
    auth,
    hasher,
    save_cookie,
    jwt,
    captcha,
    create_id,
    response,
    db,
    delete_cookie,
    create_html,
    emailer,
    Emailer,
    count_visits,
    
}