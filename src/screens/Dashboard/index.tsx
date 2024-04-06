import {Component} from "react";
import AccountService from "../../service/AccountService";
import {auth} from "../../firebase";

import "./style.css";
import App from "../../model/App";
import AppItem from "../../components/AppItem";
import BaseModal from "../../modals/BaseModal";
import AddAppModal from "../../modals/AddAppModal";
import AppAPI from "../../service/AppAPI";

type DashboardState = {
    apps: App[];
    addAppModalVisible: boolean;
    loading: boolean;
}

class Dashboard extends Component<any, DashboardState> {
    state: DashboardState = {
        apps: [],
        addAppModalVisible: false,
        loading: true
    }

    redirectToLogin = () => {
        window.location.replace('/login');
    };

    getCurrentUser = () => {
        return AccountService.getCurrentUser();
    }

    isDeveloper = () => {
        return this.getCurrentUser() !== null;
    }

    signOut = async () => {
        await AccountService.signOut();
        window.location.reload();
    }

    renderApps = (): JSX.Element[] => {
        return this.state.apps.map(app => (
            <AppItem app={app} />
        ));
    };

    fetchApps = async () => {
        const apps = await AppAPI.fetchAllApps();

        this.setState({
            apps,
            loading: false
        });
    }

    closeAddAppModal = (app?: App) => {
        let currentApps = [...this.state.apps];

        if (app !== undefined && app !== null) {
            currentApps.push(app);
        }

        this.setState({
            addAppModalVisible: false,
            apps: currentApps
        });
    }

    componentDidMount = () => {
        auth.onAuthStateChanged(() => this.forceUpdate());
        this.fetchApps();
    };

    render = () => {
        const currentUser = this.getCurrentUser();
        const isSignedIn = currentUser !== null;

        const emptyApps = this.state.apps.length <= 0;

        const isDeveloper = this.isDeveloper();

        const {
            addAppModalVisible,
            loading
        } = this.state;

        return (
            <div id={'dashboard-container'}>
                <BaseModal visible={addAppModalVisible}>
                    <AddAppModal closeCallback={this.closeAddAppModal}/>
                </BaseModal>

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

                    {loading? (
                        <div>
                            Loading...
                        </div>
                    ) : (
                        <div id={'apps-container'}>
                            {isDeveloper && (
                                <div onClick={() => this.setState({addAppModalVisible: true})}
                                     id={'add-app-card-container'}>
                                    <p>Add App</p>
                                </div>
                            )}

                            {emptyApps ? (
                                <div>
                                    There are no apps!
                                </div>
                            ) : <>{this.renderApps()}</>}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
