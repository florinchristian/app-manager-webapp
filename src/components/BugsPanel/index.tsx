import {Component} from "react";
import Bug from "../../model/Bug";
import BugItem from "../BugItem";

import "./style.css";

type BugsPanelProps = {
    visible: boolean;
    bugs: Bug[];
    updateBugs: (newBugs: Bug[]) => void;
}

class BugsPanel extends Component<BugsPanelProps, any> {
    renderBugs = (): JSX.Element[] => {
        return this.props.bugs.map(bug => (
            <BugItem bug={bug} />
        ));
    }

    render = () => {
        const {
            visible
        } = this.props;

        return (
            <div id={'bugs-panel'} style={{
                display: visible? 'flex' : 'none'
            }}>
                {this.renderBugs()}
            </div>
        );
    };
}

export default BugsPanel;
