import Bug from "../../model/Bug";
import axios from "axios";
import {APP_ENDPOINT, BUG_ENDPOINT, HOST} from "../../const";

class BugsAPI {
    static reportBug = async (appId: string, bug: Bug) => {
        await axios.post(`${HOST}/${APP_ENDPOINT}/${appId}/reportBug`, bug);
    }

    static fetchBugs = async (): Promise<Bug[]> => {
        const result
            = await axios.get(`${HOST}/${BUG_ENDPOINT}`);

        return result.data;
    }
}

export default BugsAPI;
