import { PERMISSIONS, ROLES } from "../utils/PermissionMap";
import { User } from "./User";

export class SessionManager {
    static instance: SessionManager;

    token: string;
    user: User | null;

    static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

    private constructor() {
        this.token = "";
        this.user = null;
    }

    setToken = (token: string) => {
        this.token = token;
    }

    getToken = () => {
        return this.token;
    }

    setUser = (user: User) => {
        this.user = user;
    }

    getUser = () => {
        return this.user;
    }

    getRole = () => {
        return this.user ? this.user.role : ROLES.user;
    }

    getPermissions = () => {
        return this.user ? PERMISSIONS[this.user.role] : PERMISSIONS[ROLES.user];
    }

    isLoggedIn = () => {
        return this.user !== null && this.token !== "";
    }
}