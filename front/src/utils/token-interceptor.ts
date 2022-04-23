import Cookies from "cookies-ts";
import { TOKEN_EXPIRES, variables } from './utils';

const cookies = new Cookies();
const expires = TOKEN_EXPIRES;

export const setupToken = (token: string, storage?: boolean) => {
    if(!storage) {
        cookies.set(variables.TOKEN, token, {
            expires: expires
        });
    } else {
        localStorage.setItem(variables.TOKEN, token);
    }
}

export const removeToken = () => {
    cookies.remove(variables.TOKEN);
    localStorage.removeItem(variables.TOKEN);
}

export const getToken = () => {
    const cookie = cookies.get(variables.TOKEN);
    if(cookie) {
        return cookie;
    } else {
        return localStorage.getItem(variables.TOKEN);
    }
}