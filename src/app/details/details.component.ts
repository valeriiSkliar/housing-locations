import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HousingService} from "../housing.service";
import {HousingLocation} from "../housing-location";
import {FormControl, ReactiveFormsModule, FormGroup} from "@angular/forms";
import {FirebaseService} from "../firebase.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    housingLocation: HousingLocation | undefined;
    applyForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl('')
    });
    housingLocationId?: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private housingService: HousingService,
        private firebaseService: FirebaseService
    ) {
        const housingLocationId = Number(this.route.snapshot.params["id"]);
        this.housingLocationId = housingLocationId;
        if (!isNaN(housingLocationId)) {
            this.housingLocation = this.firebaseService.getHousingLocationsById(housingLocationId);
        } else {
            this.router.navigate([''])
        }
    }

    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? ''
        );
        this.firebaseService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? '',
            this.housingLocationId ?? ''
        );
    }

    ngOnInit(): void {
    }

}
