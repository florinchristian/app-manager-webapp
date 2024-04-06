import Endpoint from "./Endpoint";
import Bug from "./Bug";

type App = {
    id?: string;
    appName: string;
    hostName: string;
    endpoints?: Endpoint[];
    bugs?: Bug[];
};

export default App;
