import axios from "axios";

class PingAPI {
    static ping = async (method: string, url: string): Promise<number> => {
        const result = await axios({
            method: method,
            url: url,
            timeout: 2000
        });

        return result.status;
    }
}

export default PingAPI;
