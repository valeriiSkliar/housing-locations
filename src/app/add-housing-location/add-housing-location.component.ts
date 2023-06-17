import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from "@angular/forms";
import {HousingService} from "../housing.service";
import {FirebaseService} from "../firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-housing-location',
  templateUrl: './add-housing-location.component.html',
  styleUrls: ['./add-housing-location.component.css']
})
export class AddHousingLocationComponent  {
    addHousingLocationForm = new FormGroup({
        name: new FormControl(''),
        photo: new FormControl(''),
        photoLink: new FormControl(''),
        id: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        availableUnits: new FormControl(0),
        wifi: new FormControl(false),
        laundry: new FormControl(false),
    });

  constructor(
      private router: Router,
      private housingService: HousingService,
      private firebaseService: FirebaseService
  ) { }


    submitHousingLocation() {
    this.firebaseService.addLocation({
        name: this.addHousingLocationForm.value.name ?? '',
        photo: this.addHousingLocationForm.value.photoLink ?? '',
        city: this.addHousingLocationForm.value.city ?? '',
        state: this.addHousingLocationForm.value.state ?? '',
        availableUnits: this.addHousingLocationForm.value.availableUnits ?? 0,
        wifi: this.addHousingLocationForm.value.wifi ?? false,
        laundry: this.addHousingLocationForm.value.laundry ?? false,
        id: this.addHousingLocationForm.value.id = ((this.firebaseService.housingList as []).length as number) + 1
    });
        this.router.navigate([''])
    }


    async addImageFile(imageInput: HTMLInputElement) {
        const files: FileList | null = imageInput.files;
        if (files !== null) {
            const fileList: File[] = Array.from(files);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer 4345ea87cbf3733814709e2d0b7b0be4aa7c2d58");
            const formData = new FormData();
            for (const file of fileList) {
                formData.append('image', file);
            }
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                referrer: ''
            };
            const result = await fetch('https://api.imgur.com/3/image', requestOptions)
                .then(response => response.text())
                .then(result => {
                    const {data} = JSON.parse(result);
                    this.addHousingLocationForm.patchValue({ photoLink: data.link })
                })
                .catch(error => console.log('error', error));

        }
    }
}
