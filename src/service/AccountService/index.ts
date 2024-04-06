import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../firebase";
import AccountsAPI from "../AccountsAPI";

import { User } from "firebase/auth";

class AccountService {
    static getCurrentUser = (): User | null => {
        return auth.currentUser;
    }

    static isDeveloper = () => {
        return auth.currentUser !== undefined && auth.currentUser !== null;
    }

    static loginWithBaseCredentials = async (email: string, password: string) => {
        console.log('login' + JSON.stringify({email, password}));

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const jwtToken = await AccountsAPI.login(await userCredential.user.getIdToken());

            localStorage.setItem('jwtToken', jwtToken);
        } catch (e) {
            //@ts-ignore
            alert(e.code);
        }
    }

    static registerWithBaseCredentials = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await AccountsAPI.createDeveloper({
                email: email,
                password: password
            });
        } catch (e) {
            //@ts-ignore
            alert(e.code);
        }
    }

    static signOut = async () => {
        await auth.signOut();
    }
}

export default AccountService;
