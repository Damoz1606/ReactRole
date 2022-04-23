import Cookies from "cookies-ts";
import { TOKEN_EXPIRES } from './utils';

const roleKey: string = 'role';
const cookies = new Cookies();
const expires = TOKEN_EXPIRES;

export const setupRole = (token: string, storage?: boolean) => {
    if (!storage) {
        cookies.set(roleKey, token, {
            expires: expires
        });
    } else {
        localStorage.setItem(roleKey, token);
    }
}

export const removeRole = () => {
    const cookies = new Cookies();
    cookies.remove(roleKey);
    localStorage.removeItem(roleKey);
}

export const getRole = () => {
    const cookies = new Cookies();
    const cookie = cookies.get(roleKey);
    if (cookie) {
        return cookie;
    } else {
        return localStorage.getItem(roleKey);
    }
}