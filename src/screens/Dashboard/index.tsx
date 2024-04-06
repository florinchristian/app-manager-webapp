import {Component} from "react";
import AccountService from "../../service/AccountService";
import {auth} from "../../firebase";

import "./style.css";
import App from "../../model/App";
import AppItem from "../../components/AppItem";
import BaseModal from "../../modals/BaseModal";
import AddAppModal from "../../modals/AddAppModal";
import AppAPI from "../../service/AppAPI";
import Bug from "../../model/Bug";
import BugsAPI from "../../service/BugsAPI";
import BugsPanel from "../../components/BugsPanel";

type DashboardState = {
    apps: App[];
    bugs: Bug[];
    addAppModalVisible: boolean;
    bugsPanelVisible: boolean;
    loading: boolean;
}

class Dashboard extends Component<any, DashboardState> {
    state: DashboardState = {
        apps: [],
        bugs: [],
        addAppModalVisible: false,
        loading: true,
        bugsPanelVisible: false
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
            <AppItem key={app.id} app={app} />
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

    componentDidMount = async () => {
        auth.onAuthStateChanged(() => this.forceUpdate());

        const results = await Promise.all([AppAPI.fetchAllApps(), BugsAPI.fetchBugs()]);

        this.setState({
            apps: results[0],
            bugs: results[1],
            loading: false
        });
    };

    render = () => {
        const currentUser = this.getCurrentUser();
        const isSignedIn = currentUser !== null;

        const emptyApps = this.state.apps.length <= 0;

        const isDeveloper = this.isDeveloper();

        const {
            addAppModalVisible,
            bugs,
            loading,
            bugsPanelVisible
        } = this.state;

        return (
            <div id={'dashboard-container'}>
                <BaseModal visible={addAppModalVisible}>
                    <AddAppModal closeCallback={this.closeAddAppModal}/>
                </BaseModal>

                {AccountService.isDeveloper() && (
                    <>
                        <BugsPanel
                            visible={bugsPanelVisible}
                            bugs={bugs}
                            updateBugs={(newBugs: Bug[]) => this.setState({bugs: newBugs})}
                        />

                        <div id={'bugs-toggle-button-container'}>
                            <button onClick={() => this.setState({bugsPanelVisible: !bugsPanelVisible})} id={'bugs-toggle-button'}>Bugs ({bugs.length})</button>
                        </div>
                    </>
                )}


                <div id={'dashboard-content'}>
                    <div id={'dashboard-footer'}>
                    <div>
                        <h1>iTec Manager</h1>
                        </div>

                        <div>
                            {isSignedIn ? (
                                <>
                                    <p>{currentUser?.email}</p>
                                    <button onClick={this.signOut}>Sign out</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={this.redirectToLogin}>Enter account</button>
                                </>
                            )}
                        </div>
                    </div>

                    {loading ? (
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
