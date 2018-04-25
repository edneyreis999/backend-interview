export interface IServerConfigurations {
    port: number;
    routePrefix: string;
}

export interface IDataConfiguration {
    connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration {
    return { "connectionString": "mongodb://localhost:27017/interview" };
}

export function getServerConfigs(): IServerConfigurations {
    return {
        "port": 5000,
        "routePrefix": "/api"
    }
}