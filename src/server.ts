import * as Hapi from "hapi";
import { IServerConfigurations } from "./configurations";
import * as Campaign from "./campaign";
import { IDatabase } from "./database";


export function init(configs: IServerConfigurations, database: IDatabase): Promise<Hapi.Server> {

    return new Promise<Hapi.Server>(resolve => {

        const port = process.env.PORT || configs.port;
        const server = new Hapi.Server();

        server.connection({
            port: port,
            routes: {
                cors: true
            }
        });

        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }
        
        console.log('Register Routes');         
        Campaign.init(server, configs, database);          
        console.log('Routes registered sucessfully.');

        resolve(server);
    });
}
