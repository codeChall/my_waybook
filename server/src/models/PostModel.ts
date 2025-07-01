import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    description: string;
    createdAt: Date;
    image: string;
    voblers: string[];
}

const postsScheme = new Schema<IPost>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        image: { type: String },
        voblers: { type: [String] }
    },
    { versionKey: false }
);

export const Posts = model<IPost>('Posts', postsScheme);