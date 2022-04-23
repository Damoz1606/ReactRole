import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
}

export const toastError = (msg: string) => {
    toast.error(msg, options);
}

export const toastWarning = (msg: string) => {
    toast.warning(msg, options);
}

export const toastSuccess = (msg: string) => {
    toast.success(msg, options);
}

export const toastMessage = (msg: string) => {
    toast(msg, options);
}

export const toastPromise = ({ success, pending, error }: any, promise: Promise<any>) => {
    toast.promise(promise, { pending, success, error, }, options);
}