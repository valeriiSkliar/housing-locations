import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  constructor(
      private router: Router,
      private authService: AuthService,
  ) { }


    async logOut() {
      await this.authService.logout()
        if (!this.authService.isLoggedIn){
            await this.router.navigate(['']);
        }
    }
}
