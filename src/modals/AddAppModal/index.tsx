import {Component} from "react";

import "./style.css";
import AppAPI from "../../service/AppAPI";
import App from "../../model/App";

type AddAppProps = {
    closeCallback: (newApp?: App) => void;
}

type AddAppModalState = {
    appName: string;
    appHostName: string;
}

class AddAppModal extends Component<AddAppProps, AddAppModalState> {
    state: AddAppModalState = {
        appName: '',
        appHostName: ''
    }

    createApp = async () => {
        const {
            appName,
            appHostName
        } = this.state;

        const app = await AppAPI.createApp({appName, hostName: appHostName});

        this.setState({
            appHostName: '',
            appName: ''
        }, () => this.props.closeCallback(app));
    }

    render = () => {
        return (
            <div id={'add-app-modal'}>
                <h1>Add App</h1>

                <form>
                    <div className={'form-input'}>
                        <label htmlFor={'app-name'}>App name</label>
                        <input
                            id={'app-name'}
                            onChange={e => this.setState({appName: e.target.value})}
                            value={this.state.appName}
                            type={'text'}
                        />
                    </div>

                    <div className={'form-input'}>
                        <label htmlFor={'app-hostname'}>App hostname</label>
                        <input
                            id={'app-hostname'}
                            onChange={e => this.setState({appHostName: e.target.value})}
                            value={this.state.appHostName}
                            type={'text'}
                        />
                    </div>

                    <button type={'button'} onClick={() => this.props.closeCallback()}>Dismiss</button>


                    <button onClick={e => {
                        e.preventDefault();

                        this.createApp();
                    }}>Create
                    </button>
                </form>
            </div>
        );
    };
}

export default AddAppModal;
