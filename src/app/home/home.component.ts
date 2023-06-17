import {Component, OnDestroy, OnInit} from '@angular/core';
import {HousingLocation} from "../housing-location";
import {FirebaseService, LocationInterface} from "../firebase.service";
import {SearchService} from "../services/search.service";
import {Subscription} from "rxjs";
import {FilterLocationValueService} from "../services/filter-location-value.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    housingLocationList: any = [];
    filteredLocationList: any = [];
    filterValue!:string;
    private subscription?: Subscription;

    constructor(
        private firebaseService: FirebaseService,
        private searchService: SearchService,
        private filterService: FilterLocationValueService,
    ) { }

    async ngOnInit(): Promise<void> {
        this.housingLocationList = await this.firebaseService.getHousingList();
        this.filteredLocationList = this.firebaseService.housingList;
        this.subscription = this.filterService.filterTerm$
            .subscribe(newValue => this.filterValue = newValue)

    }


    ngOnDestroy(): void {
    }
}
