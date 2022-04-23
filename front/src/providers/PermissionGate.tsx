import React from 'react'
import { SessionManager } from '../managers/SessionManager';
import { PERMISSIONS, ROLES } from "../utils/PermissionMap";

interface PermissionProps {
    children: any;
    scopes?: string[];
}

interface RoleProps {
    children: any;
    roles?: string[];
}

const hasPermission = ({ permissions, scopes }: any) => {
    const scopeMap: any = {};
    scopes.forEach((scope: any) => {
        scopeMap[scope] = true;
    });
    return permissions.some((permission: any) => scopeMap[permission]);
}

const hasRole = ({ role, roles = [] }: any) => {
    return roles.includes(role);
}

export const RoleGate = (props: RoleProps) => {
    const role = SessionManager.getInstance().getRole();
    const roles = props.roles || [ROLES.admin, ROLES.user, ROLES.user];
    return hasRole({ role, roles }) ? <>{props.children} </> : null;
}


export const PermissionGate = (props: PermissionProps) => {
    const role = SessionManager.getInstance().getRole();
    const permissions = PERMISSIONS[role];
    const scopes =  props.scopes || [];

    return hasPermission({ permissions, scopes }) ? <>{props.children} </> : null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {PermissionGate, RoleGate};