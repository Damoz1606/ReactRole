import { Image } from "../classes/Image";

export class ImageManager {
    private static instance: ImageManager;
    static getInstance(): ImageManager {
        if (!ImageManager.instance) {
            ImageManager.instance = new ImageManager();
        }
        return ImageManager.instance;
    }

    private images: Image[]|null = null;
    private constructor() {}

    getImages = () => {
        return this.images;
    }

    setImages = (images: Image[]) => {
        this.images = images;
    }

    addImage = (image: Image) => {
        this.images && this.images.push(image);
    }

    removeImage = (image: Image) => {
        if(!this.images) return;
        this.images = this.images.filter(img => `${img._id}` !== `${image._id}`);
    }
}