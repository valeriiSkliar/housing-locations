import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    email: string = '';
    password: string = '';
    hasAccount: boolean = false;
  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

    async onSubmit(RegisterForm: NgForm) {
        if (RegisterForm.invalid) {
            return;
        }

        this.email = RegisterForm.value.email;
        this.password = RegisterForm.value.password;

        const registerResult = await this.authService.register(this.email, this.password)
            .then((data) => {
                this.authService.isLoggedIn = true;
            });
        console.log(registerResult)

        await this.router.navigate(['']);
    }
}
