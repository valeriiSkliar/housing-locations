import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {DetailsComponent} from "./details/details.component";
import {AddHousingLocationComponent} from "./add-housing-location/add-housing-location.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {Page404Component} from "./page404/page404.component";

const routes: Routes = [{
  path:'',
  component:HomeComponent,
},
  {
    path:'details/:id',
    component:DetailsComponent,
    pathMatch: 'full'
  },
 {
    path:'add-location',
    component:AddHousingLocationComponent,
  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
