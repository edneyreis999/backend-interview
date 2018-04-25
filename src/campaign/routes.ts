import * as Hapi from "hapi";
import CampaignController from "./campaign-controller";
import * as Joi from "joi";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const campaignController = new CampaignController(configs, database);
    server.bind(campaignController);

    server.route({
        method: 'GET',
        path: '/campaign/{id}',
        config: {
            handler: campaignController.getCampaignById,
            description: 'Get campaign by id',
            validate: {
                params: {
                    id: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/campaign',
        config: {
            handler: campaignController.getCampaigns,
            tags: ['api', 'campaigns'],
            description: 'Get all campaigns.'
        }
    });

    server.route({
        method: 'DELETE',
        path: '/campaign/{id}',
        config: {
            handler: campaignController.deleteCampaign,
            tags: ['api', 'campaigns'],
            description: 'Delete campaign by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/campaign/{id}',
        config: {
            handler: campaignController.updateCampaign,
            tags: ['api', 'campaigns'],
            description: 'Update campaign by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/campaign',
        config: {
            handler: campaignController.createCampaign,
            tags: ['api', 'campaigns'],
            description: 'Create a campaign.'            
        }
    });
}