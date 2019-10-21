import mongoose from "mongoose";

export interface IItem extends mongoose.Document {
    name: string;
    description: string;
    amount: string;
    image: string;
};

const ItemSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    image: { type: String, required: true },
});

export const Item = mongoose.model<IItem>("Item", ItemSchema);



// _id: mongoose.Schema.Types.ObjectId,