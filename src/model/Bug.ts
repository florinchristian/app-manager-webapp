import App from "./App";

type Bug = {
    id?: string;
    title: string;
    description: string;
    solved?: boolean;
    app?: App;
};

export default Bug;
