import {Component} from "react";

import "./style.css";
import App from "../../model/App";

type ReportBugModalProps = {
    app: App;
    closeCallback: () => void;
}

type ReportBugModalState = {
    bugTitle: string;
    bugDescription: string;
}

class ReportBugModal extends Component<ReportBugModalProps, ReportBugModalState> {
    state: ReportBugModalState = {
        bugTitle: '',
        bugDescription: ''
    }

    render = () => {
        const {
            bugTitle,
            bugDescription
        } = this.state;

        return (
            <div className={'report-bug-modal'}>
                <p>{this.props.app.appName}</p>
                <h1>Report bug</h1>

                <form>
                    <label>Title</label>
                    <input
                        value={bugTitle}
                        onChange={e => this.setState({bugTitle: e.target.value})}
                        type={'text'}
                    />

                    <label>Description</label>
                    <textarea
                        value={bugDescription}
                        onChange={e => this.setState({bugDescription: e.target.value})}
                    ></textarea>

                    <button type={'button'}>Submit</button>
                </form>

                <button onClick={this.props.closeCallback} type={'button'}>Dismiss</button>

            </div>
        );
    };
}

export default ReportBugModal;
