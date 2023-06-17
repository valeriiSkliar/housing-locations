import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
    }

    async onSubmit(loginForm: NgForm) {
        if (loginForm.invalid) {
            return;
        }

        const email = loginForm.value.email;
        const password = loginForm.value.password;

        await this.authService.login(email, password)
            .then((data) => {
                this.authService.isLoggedIn = true;
                this.authService.username = data.email;
            });
        await this.router.navigate(['']);
    }
}
