import EndpointMethod from "./EndpointMethod";

type Endpoint = {
    id?: string;
    endpoint: string;
    endpointMethod: EndpointMethod | string;
};

export default Endpoint;
