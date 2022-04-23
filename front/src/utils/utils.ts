export const variables = {
    URI: process.env.REACT_APP_URI,
    PREFIX: process.env.REACT_APP_PREFIX,
    VERSION: process.env.REACT_APP_URI_VERSION,
}

export const URI = `${variables.URI}/${variables.PREFIX}/${variables.VERSION}`;

export enum ROLE {
    admin = "admin",
    user = "user",
    author = "author",
}

export enum LOGIN_MESSAGES {
    SUCCESS = "Ingreso exitoso",
    ERROR = "Asegurese que los campos sean correctos",
    PENDING = "Comprando usuario",
}
