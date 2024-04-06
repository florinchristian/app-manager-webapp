import {Component} from "react";

import "./style.css";

type BaseModalProps = {
    visible: boolean;
    children: JSX.Element
}

class BaseModal extends Component<BaseModalProps, any> {
    render = () => {
        return (
            <div style={{
                display: this.props.visible? 'flex' : 'none'
            }} className={'base-modal'}>
                {this.props.children}
            </div>
        );
    }
}

export default BaseModal;
