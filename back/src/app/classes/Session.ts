export interface Session extends Document {
    _id?: string;
    user: string;
    expires: Date;
}