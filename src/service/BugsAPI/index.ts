import Bug from "../../model/Bug";
import axios from "axios";
import {APP_ENDPOINT, HOST} from "../../const";

class BugsAPI {
    static reportBug = async (appId: string, bug: Bug) => {
        await axios.post(`${HOST}/${APP_ENDPOINT}/${appId}/reportBug`, bug);
    }
}

export default BugsAPI;
