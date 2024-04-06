import {Component} from "react";
import App from "../../model/App";

import "./style.css";
import Endpoint from "../../model/Endpoint";
import EndpointMethod from "../../model/EndpointMethod";
import AppAPI from "../../service/AppAPI";
import EndpointItem from "../EndpointItem";
import AccountService from "../../service/AccountService";
import BaseModal from "../../modals/BaseModal";
import ReportBugModal from "../../modals/ReportBugModal";

type AppItemProps = {
    app: App;
}

type AppItemState = {
    isViewingEndpoints: boolean;
    endpoints: Endpoint[];
    loading: true;
    newEndpointMethod: string;
    newEndpoint: string;
    isReportingBug: boolean;
    endpointStatus: {[key: string]: ('STABLE' | 'UNSTABLE' | 'DOWN')}
}

type CardAction = {
    name: string,
    callback: () => void;
}

class AppItem extends Component<AppItemProps, AppItemState> {
    state: AppItemState = {
        isViewingEndpoints: false,
        endpoints: this.props.app.endpoints || [],
        loading: true,
        newEndpointMethod: 'GET',
        newEndpoint: '',
        isReportingBug: false,
        endpointStatus: {}
    }

    UNIVERSAL_ACTIONS: CardAction[] = [
        {
            name: 'Endpoints',
            callback: () => this.setState({isViewingEndpoints: !this.state.isViewingEndpoints})
        }
    ];

    USER_ACTIONS: CardAction[] = [
        {
            name: 'Report Bug',
            callback: () => this.setState({isReportingBug: true})
        }
    ];

    renderActions = () => {
        let finalActions = this.UNIVERSAL_ACTIONS;

        if (!AccountService.isDeveloper()) {
            finalActions = [...this.USER_ACTIONS, ...this.UNIVERSAL_ACTIONS];
        }

        return finalActions.map(action => (
            <button
                type={'button'}
                onClick={() => action.callback()}
            >
                {action.name}
            </button>
        ));
    }

    createEndpoint = async () => {
        const {
            newEndpoint,
            newEndpointMethod
        } = this.state;

        const endpoint: Endpoint = {
            endpoint: newEndpoint,
            method: newEndpointMethod
        };

        const newApp = await AppAPI.createEndpoint(this.props.app.id || '', endpoint);

        this.setState({
            newEndpoint: '',
            newEndpointMethod: 'GET',
            endpoints: newApp.endpoints || this.state.endpoints
        }, this.forceUpdate);
    }

    updateEndpointStatus = (endpointId: string, status: 'STABLE' | 'UNSTABLE' | 'DOWN') => {
        this.setState({
            endpointStatus: {...this.state.endpointStatus, endpointId: status}
        });
    }

    renderEndpoints = () => {
        return this.state.endpoints.map(endpoint => (
            <EndpointItem app={this.props.app} endpoint={endpoint} />
        ));
    }

    render = () => {
        const {
            app
        } = this.props;

        const {
            endpoints,
            isViewingEndpoints,
            newEndpointMethod,
            newEndpoint,
            isReportingBug
        } = this.state;

        const noEndpointIsPresent = endpoints.length <= 0;

        return (
            <div className={'app-item'}>
                <BaseModal visible={isReportingBug}>
                    <ReportBugModal app={app} closeCallback={() => this.setState({isReportingBug: false})}/>
                </BaseModal>

                <div className={'details-container'}>
                    <div className={'base-app-details'}>
                        <p>Name: <span>{app.appName}</span></p>
                        <p>Host name: {app.hostName}</p>
                    </div>

                    <div>
                        {this.renderActions()}
                    </div>
                </div>

                {isViewingEndpoints && (
                    <div className={'endpoints-container'}>
                        {AccountService.isDeveloper() && (
                            <form className={'create-endpoint-container'}>
                                <h3>Add new endpoint</h3>

                                <label>Select method</label>
                                <select
                                    className={'endpoint-method-selector'}
                                    value={newEndpointMethod}
                                    onChange={e => this.setState({newEndpointMethod: e.target.value})}
                                >
                                    <option>GET</option>
                                    <option>POST</option>
                                    <option>PATCH</option>
                                </select>

                                <label>Endpoint</label>
                                <input
                                    className={'endpoint'}
                                    value={newEndpoint}
                                    onChange={e => this.setState({newEndpoint: e.target.value})}
                                    type={"text"}
                                />

                                <button onClick={this.createEndpoint} type={'button'}>Create</button>
                            </form>
                        )}

                        {noEndpointIsPresent ? (
                            <p>There are no endpoints registered!</p>
                        ) : (
                            <>
                                <h3>Registered Endpoints</h3>
                                {this.renderEndpoints()}
                            </>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default AppItem;
