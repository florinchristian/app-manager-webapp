import {Component} from "react";
import AccountService from "../../service/AccountService";
import {auth} from "../../firebase";

import "./style.css";

class Dashboard extends Component<any, any> {
    redirectToLogin = () => {
        window.location.replace('/login');
    };

    getCurrentUser = () => {
        return AccountService.getCurrentUser();
    }

    signOut = async () => {
        await AccountService.signOut();
        this.forceUpdate();
    }

    componentDidMount = () => {
        auth.onAuthStateChanged(() => this.forceUpdate());
    };

    render = () => {
        const currentUser = this.getCurrentUser();
        const isSignedIn = currentUser !== null;

        return (
            <div id={'dashboard-container'}>
                <div id={'dashboard-content'}>
                    <div id={'dashboard-footer'}>
                        <div>
                            <h1>iTec Manager</h1>
                        </div>

                        <div>
                            {isSignedIn? (
                                <>
                                    <p>{currentUser?.email}</p>
                                    <button onClick={this.signOut}>Sign out</button>
                                </>
                            ): (
                                <>
                                    <button onClick={this.redirectToLogin}>Enter account</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
