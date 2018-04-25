import * as Hapi from "hapi";
import { ICampaign } from "./campaign";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default class CampaignController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createCampaign(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let newCampaign: ICampaign = request.payload;
        console.log('---- newCampaign ----');
            console.log(newCampaign);
        try {
            let campaign: ICampaign = this.database.campaignModel.create(newCampaign);
            return reply(campaign).code(201);
        } catch (error) {
            console.log('---- error ----');
            console.log(error);
            return reply(error);
        }
    }

    public async updateCampaign(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let campaignPayload: ICampaign = request.payload;
            try {
                let campaign: ICampaign = await this.database.campaignModel.findByIdAndUpdate(
                    { _id: id },
                    { $set: campaignPayload },
                    { new: true }
                );
                if (campaign) {
                    return reply(campaign);
                } else {
                    return reply("Campaign com id: " + id + " não foi encontrado");
                }
            } catch (error) {
                return reply(error);
            }
        } else {
            return reply("invalid campaign id: " + id);
        }

    }

    public async deleteCampaign(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let deletedCampaign = await this.database.campaignModel.findOneAndRemove({ _id: id });
            return reply(deletedCampaign);
        } else {
            return reply("invalid campaign id: " + id);
        }

    }

    public async getCampaignById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let campaign = await this.database.campaignModel.findOne({ _id: id }).lean(true);

                if (campaign) {
                    return reply(campaign);
                } else {
                    return reply("Campaign com id: " + id + " não encontrado.");
                }

            } else {
                return reply("invalid campaign id: " + id);
            }

        } catch (error) {
            return reply(error);
        }
    }

    public async getCampaigns(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        console.log('------ newCampaign --------');
        let campaigns = await this.database.campaignModel.find({}).lean(true);
        if (campaigns) {
            return reply(campaigns);
        } else {
            return reply("Ainda não temos nenhum Campaign cadastrado");
        }
    }
}