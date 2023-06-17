import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
    loggedUser?: string | unknown;

  constructor(
      public authService: AuthService
  ) { }

  async ngOnInit(): Promise<any> {
      try {
          this.loggedUser = await this.authService.checkUserState();
      } catch (error) {
          console.error(error);
      }
  }
}
