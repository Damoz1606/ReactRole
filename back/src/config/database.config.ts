import mongoose from 'mongoose';
import config from './config';

export const MONGO_URI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_NAME}?retryWrites=true&w=majority`;

export const initConnection = async () => {
    const URI: string = MONGO_URI;
    try {
        const res = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`Connected to ${res.connection.name}`);
    } catch (error: any) {
        console.log("Ups! Something went wrong")
    }
}