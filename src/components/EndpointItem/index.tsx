import {Component} from "react";
import Endpoint from "../../model/Endpoint";
import App from "../../model/App";
import PingAPI from "../../service/PingAPI";

type EvaluationState = 'EVALUATING' | 'STABLE' | 'UNSTABLE' | 'DOWN';

type EndpointItemState = {
    endpointStates: ('UP' | 'DOWN')[];
    evaluation: EvaluationState;
}

type EndpointItemProps = {
    app: App;
    endpoint: Endpoint;
    onStatusUpdate: (newStatus: EvaluationState) => void
}

class EndpointItem extends Component<EndpointItemProps, EndpointItemState> {
    state: EndpointItemState = {
        evaluation: 'EVALUATING',
        endpointStates: []
    }

    computeStatus = () => {
        let result: EvaluationState = 'STABLE';

        if (this.state.endpointStates.length < 10) {
            result = 'EVALUATING';
        }


        let downCount = 0;

        for (let i = 0; i <= 9; ++i) {
            let status = this.state.endpointStates[i];

            if (status === 'DOWN') {
                downCount++;

                result = 'UNSTABLE';
            } else {
                downCount = 0;
            }
        }

        if (downCount === 10) {
            result = 'DOWN';
        }

        return result;
    }

    startEvaluating = () => {
        setInterval(async () => {
            let url = `${this.props.app.hostName}${this.props.endpoint.endpoint}`;

            let newEndpointStates = this.state.endpointStates;

            try {
                const code = await PingAPI.ping(this.props.endpoint.method, url);

                if (code === 200 || code === 302) {
                    newEndpointStates.push('UP');
                } else {
                    newEndpointStates.push('DOWN');
                }
            } catch (e) {
                newEndpointStates.push('DOWN');
            }

            if (newEndpointStates.length > 10) {
                newEndpointStates.shift();
            }

            this.setState({
                endpointStates: newEndpointStates
            });
        }, 1000);
    }

    componentDidMount = () => {
        this.startEvaluating();
    }

    render = () => {
        const {
            endpoint
        } = this.props;

        return (
            <div className={'endpoint-item'}>
                <div>
                    <p>{endpoint.method}</p>
                    <p>{endpoint.endpoint}</p>
                </div>

                <div>
                    <p>Status: {this.computeStatus()}</p>
                </div>
            </div>
        );
    }
}

export default EndpointItem;
