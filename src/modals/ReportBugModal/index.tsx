import {Component} from "react";

import "./style.css";
import App from "../../model/App";
import Bug from "../../model/Bug";
import bug from "../../model/Bug";
import BugsAPI from "../../service/BugsAPI";

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

    reportBug = async () => {
        const {
            bugTitle,
            bugDescription
        } = this.state;

        const bug: Bug = {
            title: bugTitle,
            description: bugDescription
        };

        await BugsAPI.reportBug(this.props.app.id || '', bug);

        this.setState({
            bugDescription: '',
            bugTitle: ''
        }, this.props.closeCallback);
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

                    <button onClick={this.reportBug} type={'button'}>Submit</button>
                </form>

                <button onClick={this.props.closeCallback} type={'button'}>Dismiss</button>

            </div>
        );
    };
}

export default ReportBugModal;
