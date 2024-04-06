import {FC} from "react";
import Endpoint from "../../model/Endpoint";

type EndpointItemProps = {
    endpoint: Endpoint;
}

const EndpointItem: FC<EndpointItemProps> = ({endpoint}) => {
    return (
        <div className={'endpoint-item'}>
            <p>{endpoint.endpointMethod}</p>
            <p>{endpoint.endpoint}</p>
        </div>
    );
};

export default EndpointItem;
