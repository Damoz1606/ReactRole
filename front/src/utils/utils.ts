export const variables = {
    URI: process.env.REACT_APP_URI,
    PREFIX: process.env.REACT_APP_PREFIX,
    VERSION: process.env.REACT_APP_URI_VERSION,
    TOKEN: process.env.REACT_APP_TOKEN || '',
}

export const URI = `${variables.URI}/${variables.PREFIX}/${variables.VERSION}`;

export const TOKEN_EXPIRES = '2h';

export enum ROLE {
    admin = "admin",
    user = "user",
    author = "author",
}

export enum LOGIN_MESSAGES {
    SUCCESS = "Ingreso exitoso",
    ERROR = "Asegurese que los campos sean correctos",
    PENDING = "Comprobando usuario",
}
