import { Component } from "react";
import "./style.css";
import AccountService from "../../service/AccountService";

type LoginState = {
    email: string;
    password: string;
    register: boolean;
}

class Login extends Component<any, LoginState> {
    state: LoginState = {
        email: '',
        password: '',
        register: false
    }

    logUserIn = async () => {
        const {
            email,
            password
        } = this.state;

        await AccountService.loginWithBaseCredentials(email, password);

        window.location.replace('/');
    }

    registerUser = async () => {
        const {
            email,
            password
        } = this.state;

        await AccountService.registerWithBaseCredentials(email, password);

        window.location.replace('/');
    }

    showRegister = () => {
        this.setState({
            register: true
        });
    }

    showLogin = () => {
        this.setState({
            register: false
        });
    }

    render = () => {
        const {
            register
        } = this.state;

        return (
            <div id={'login-container'}>
                <div id={'form-container'}>
                    <form id={'form'}>
                        <div className={'input-container'}>
                            <label htmlFor={'user-email'}>Email</label>
                            <input
                                onChange={e => this.setState({email: e.target.value})}
                                id={'user-email'}
                                type={"email"} required
                            />
                        </div>

                        <div className={'input-container'}>
                            <label htmlFor={'user-password'}>Password</label>
                            <input
                                onChange={e => this.setState({password: e.target.value})}
                                id={'user-password'}
                                type={"password"}
                                required
                            />
                        </div>

                        {!register && (
                            <div>
                                <a onClick={this.showRegister} href={'#'}>You don't have an account? Register</a>
                            </div>
                        )}

                        {register && (
                            <div>
                                <a onClick={this.showLogin} href={'#'}>Already have an account? Login</a>
                            </div>
                        )}

                        <button onClick={e => {
                            e.preventDefault();

                            if (register) {
                                this.registerUser();
                            } else {
                                this.logUserIn();
                            }

                        }} type={'submit'}>{register ? 'Register' : 'Login'}</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
