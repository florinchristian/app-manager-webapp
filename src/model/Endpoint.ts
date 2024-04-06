import EndpointMethod from "./EndpointMethod";

type Endpoint = {
    id?: string;
    endpoint: string;
    method: EndpointMethod | string;
};

export default Endpoint;
