import * as Mongoose from "mongoose";

export interface IAction extends Mongoose.Document {
    title: string;
    description?: string;
    dateBegin: Date;
    dateEnd: Date;
}

export interface ICampaign extends Mongoose.Document {
    imgUrl: string;
    title: string;
    description?: string;
    dateBegin: Date;
    dateEnd: Date;
    //actions?: Array<IAction>;
    createdAt: Date;
    updateAt: Date;
}

export const CampaignSchema = new Mongoose.Schema({
    imgUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    actions: [],
    dateBegin: { type: Date, default: Date.now },
    dateEnd: { type: Date, default: Date.now }
}, {
        timestamps: true
    });

export const CampaignModel = Mongoose.model<ICampaign>('Campaign', CampaignSchema);