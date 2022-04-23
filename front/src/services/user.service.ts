import axios from "axios"
import { SessionManager } from "../classes/SessionManager";
import { URI } from "../utils/utils"

export const login = async ({ email, password }: any) => {
    return await axios.post(`${URI}/auth`, { email, password },
        {
            headers: {
                Authorization: SessionManager.getInstance().getToken()
            }
        });
}

export const signup = async (user: any, password: string) => {
    user.password = password;
    return await axios.post(`${URI}/signup`, user,
        {
            headers: {
                Authorization: SessionManager.getInstance().getToken()
            }
        });
}

export const logout = async () => {
    return await axios.post(`${URI}/logout`, {},
        {
            headers: {
                Authorization: SessionManager.getInstance().getToken()
            }
        });
}