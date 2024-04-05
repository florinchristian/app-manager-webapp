import {Component} from "react";
import AccountService from "../../service/AccountService";

class Dashboard extends Component<any, any> {
    redirectToLogin = () => {
        window.location.replace('/login');
    };

    componentDidMount = () => {
        const currentUser = AccountService.getCurrentUser();

        if (currentUser === null) {
            this.redirectToLogin();
        }
    }

    render = () => {
         return (
             <div>
                 dashboard
             </div>
         );
    }
}

export default Dashboard;
