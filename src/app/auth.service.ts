import {Injectable} from '@angular/core';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {app} from "./firebase.service";
import {CookieService} from 'ng2-cookies';

const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn:boolean = false;
    username:string | null= ''; //
    userCredential?:any;
    cookies?: Object;
    keys?: Array<string>;
    checkName: string = 'userToken';
    private auth = getAuth(app);

  constructor(
      public cookieService: CookieService
  ) {  }

    update() {
        this.cookies = this.cookieService.getAll();
        if (this.cookies){
            this.keys = Object.keys(this.cookies);
        }
    }

    addCookie(cName: string, cValue: string, username: string ) {
        console.log('Adding: ', cName, cValue);
        this.cookieService.set(cName, cValue);
        this.cookieService.set("userName", username);
        this.update();
    }
    removeCookie(rName: string) {
        console.log('Removing: ', rName);
        this.cookieService.delete(rName);
        this.update();
    }
    removeAll() {
        console.log('Removing all cookies');
        this.cookieService.deleteAll();
        this.update();
    }
    checkCookie() {
        console.log('Checking: ', this.checkName);
        if (this.checkName){
            this.cookieService.check(this.checkName) ? this.isLoggedIn = true: this.isLoggedIn = false;
            console.log(this.isLoggedIn)
            this.username = this.cookieService.get('userName');
        }
    }
    async login(email: string, password: string): Promise<any> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            const currentUser = this.auth.currentUser;
            if (currentUser) {
                // this.username = email;
                return currentUser;
            } else {
                throw new Error('User login failed');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // register(email: string, password: string, hasAccount: boolean): Promise<any> {
    //     if (true){
    //         return createUserWithEmailAndPassword(auth, email, password)
    //             .then((userCredential) => {
    //                 hasAccount = false;
    //                 const {email} = userCredential.user;
    //                 this.username = email;
    //                 this.userCredential = userCredential;
    //                 console.log(userCredential)
    //                 const usi = this.userCredential.user.reloadUserInfo.localId;
    //                 this.addCookie(this.checkName, usi, (this.username as string))
    //                 return userCredential;
    //                 // ...
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //                 console.log(errorCode)
    //                 console.log(errorMessage)
    //             });
    //     } else {
    //         return Promise.reject('cookie')
    //     }
    // }

    async register(email: string, password: string): Promise<any> {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
            const currentUser = this.auth.currentUser;
            if (currentUser) {
                this.username = email;
                this.isLoggedIn = true;
                return currentUser;
            } else {
                throw new Error('User registration failed');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    checkUserState(): Promise<any> {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.username = user.email;
                    this.isLoggedIn = true;
                    resolve(user.email);
                } else {
                    console.log("No user is logged in");
                    reject('Need to login or register');
                }
            });
        });
    }

    async logout(): Promise<void> {
        try {
            await signOut(this.auth);
            this.isLoggedIn = false;
            console.log("User has logged out");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

}
