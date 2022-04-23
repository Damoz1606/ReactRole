import { PERMISSIONS } from "../utils/PermissionMap";
import { getRole, removeRole, setupRole } from "../utils/role-interceptor";
import { getToken, removeToken, setupToken } from "../utils/token-interceptor";
import { ROLE } from "../utils/utils";
import { User } from "../classes/User";

export class SessionManager {
    static instance: SessionManager;

    token: string | null;
    role: string | null;

    static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

    private constructor() {
        this.token = null;
        this.role = null;
    }

    setToken = (token: string) => {
        this.token = token;
        setupToken(token);
    }

    getToken = () => {
        if(!this.token) {
            this.token = getToken();
        }
        return this.token || '';
    }

    setRole = (user: User) => {
        this.role = user.role;
        setupRole(this.role);
    }

    getRole = () => {
        if(!this.role) {
            this.role = getRole();
        }
        return this.role ? this.role : ROLE.user;
    }

    getPermissions = () => {
        return this.role ? PERMISSIONS[this.role] : PERMISSIONS[ROLE.user];
    }

    logout = () => {
        this.token = null;
        this.role = null;
        removeRole();
        removeToken();
    }

    isLoggedIn = () => {
        if(!this.token) {
            this.token = getToken();
        }
        if(!this.role) {
            this.role = getRole();
        }
        return this.role && this.token;
    }
}