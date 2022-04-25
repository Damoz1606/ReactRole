import axios from "axios";
import { Image, imageConverter } from "../classes/Image";
import { SessionManager } from "../managers/SessionManager";
import { URI } from "../utils/utils";

export const getImages = async () => {
    return await axios.get(`${URI}/images`, {
        headers: {
            Authorization: `Bearer ${SessionManager.getInstance().getToken()}`
        }
    });
}

export const postImage = async (image: File) => {
    const form = new FormData();
    form.append("image", image);
    return await axios.post(`${URI}/images`, form, {
        headers: {
            Authorization: `Bearer ${SessionManager.getInstance().getToken()}`
        }
    });
}

export const deleteImages = async () => {
    return await axios.delete(`${URI}/images`, {
        headers: {
            Authorization: `Bearer ${SessionManager.getInstance().getToken()}`
        }
    });
}

export const getImage = async (id: string) => {
    return await axios.get(`${URI}/images/${id}`, {
        headers: {
            Authorization: `Bearer ${SessionManager.getInstance().getToken()}`
        }
    });
}

export const putImage = async (id: string, image: File) => {
    const form = new FormData();
    form.append("image", image);
    return await axios.put(`${URI}/images/${id}`, form, {
        headers: {
            Authorization: `Bearer ${SessionManager.getInstance().getToken()}`
        }
    });
}

export const deleteImage = async (id: string) => {
    return await axios.delete(`${URI}/images/${id}`, {
        headers: {
            Authorization: `Bearer ${SessionManager.getInstance().getToken()}`
        }
    });
}