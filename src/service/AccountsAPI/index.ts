import Developer from "../../model/Developer";
import axios from "axios";
import {DEVELOPER_ENDPOINT, HOST, LOGIN_ENDPOINT} from "../../const";

class AccountsAPI {
    static createDeveloper = async (developer: Developer) => {
        const result
            = await axios.post(`${HOST}/${DEVELOPER_ENDPOINT}`, developer);

        return result.data;
    }

    static login = async (idToken: string): Promise<string> => {
        const result
            = await axios.post(`${HOST}/${LOGIN_ENDPOINT}`, idToken);

        console.log(result);

        return result.data
    }
}

export default AccountsAPI;
