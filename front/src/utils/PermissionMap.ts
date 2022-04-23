export const ROLES = {
    admin: "admin",
    user: "user",
    author: "author",
}

export const SCOPES = {
    canCreate: "canCreate",
    canEdit: "canEdit",
    canRead: "canRead",
    canDelete: "canDelete",
}

export const PERMISSIONS = {
    [ROLES.admin]: [
        SCOPES.canCreate,
        SCOPES.canEdit,
        SCOPES.canRead,
        SCOPES.canDelete,
    ],
    [ROLES.user]: [
        SCOPES.canRead
    ],
    [ROLES.author]: [
        SCOPES.canCreate,
        SCOPES.canEdit,
    ],
}