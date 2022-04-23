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

export enum LOGOUT_MESSAGES {
    SUCCESS = "Sesión cerrada",
    ERROR = "Error al cerrar sesión",
    PENDING = "Cerrando sesión",
}

export enum NOTE_MESSAGES {
    GETTING_SUCCESS = "Notas obtenidas exitosamente",
    GETTING_ERROR = "Error al obtener las notas",
    GETTING_PENDING = "Obteniendo notas",
    DELETE_SUCCESS = "Nota eliminada exitosamente",
    DELETE_PENDING = "Eliminando nota",
    DELETE_ERROR = "Error al eliminar la nota",
    UPDATE_SUCCESS = "Nota actualizada exitosamente",
    UPDATE_PENDING = "Actualizando nota",
    UPDATE_ERROR = "Error al actualizar la nota",
    ADDING_SUCCESS = "Nota agregada",
    ADDING_PENDING = "Agregando nota",
    ADDING_ERROR = "Ha ocurrido un error",
}

export enum IMAGE_MESSAGES {
    GETTING_SUCCESS = "Imagenes obtenidas exitosamente",
    GETTING_ERROR = "Error al obtener las imagenes",
    GETTING_PENDING = "Obteniendo imagenes",
    DELETE_SUCCESS = "Imagen eliminada exitosamente",
    DELETE_PENDING = "Eliminando imagen",
    DELETE_ERROR = "Error al eliminar la imagen",
    UPDATE_SUCCESS = "Imagen actualizada exitosamente",
    UPDATE_PENDING = "Actualizando imagen",
    UPDATE_ERROR = "Error al actualizar la imagen",
    ADDING_SUCCESS = "Imagen agregada",
    ADDING_PENDING = "Agregando imagen",
    ADDING_ERROR = "Ha ocurrido un error",
}