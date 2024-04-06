import {FC} from "react";
import Bug from "../../model/Bug";

import "./style.css";

type BugItemProps = {
    bug: Bug;
}

const BugItem: FC<BugItemProps> = ({bug}) => {
    return (
        <div className={'bug-item'}>
            <div className={'bug-info-container'}>
                <p>App: {bug.app?.appName}</p>

                <p>Title: {bug.title}</p>
                <p>Description: {bug.description}</p>
            </div>

            <div className={'bug-fix-button-container'}>
                <button type={'button'}>Mark as fixed</button>
            </div>
        </div>
    );
}

export default BugItem;
