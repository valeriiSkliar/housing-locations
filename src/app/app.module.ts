import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HousingLocationComponent} from './housing-location/housing-location.component';
import {DetailsComponent} from './details/details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FirebaseService} from "./firebase.service";
import {AddHousingLocationComponent} from './add-housing-location/add-housing-location.component';
import {AddButtonComponent} from './add-button/add-button.component';
import {NavComponent} from './nav/nav.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {CookieService} from "ng2-cookies";
import { Page404Component } from './page404/page404.component';
import { HeaderComponent } from './components/header/header.component';
import {PaginationModule} from "./shered/pagination/pagination.module";
import {LocationFilterModule} from "./shered/location-filter/location-filter.module";
import { LocationListManagementComponent } from './profile/location-list-management/location-list-management.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HousingLocationComponent,
        DetailsComponent,
        AddHousingLocationComponent,
        AddButtonComponent,
        NavComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        Page404Component,
        HeaderComponent,
        LocationListManagementComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        LocationFilterModule
    ],
    providers: [
        FirebaseService,
        CookieService],
    exports: [
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
