import App from "../../model/App";
import axios from "axios";
import {APP_ENDPOINT, HOST} from "../../const";
import Endpoint from "../../model/Endpoint";

class AppAPI {
    static createApp = async (app: App): Promise<App> => {
        const result
            = await axios.post(`${HOST}/${APP_ENDPOINT}`, app);

        return result.data;
    }

    static fetchAllApps = async (): Promise<App[]> => {
        const result
            = await axios.get(`${HOST}/${APP_ENDPOINT}`);

        return result.data;
    }

    static createEndpoint = async (appId: string, endpoint: Endpoint): Promise<App> => {
        const result
            = await axios.post(`${HOST}/${APP_ENDPOINT}/${appId}/endpoint`, endpoint);

        return result.data;
    }
}

export default AppAPI;
