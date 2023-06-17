import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from "../../firebase.service";

@Component({
  selector: 'app-location-list-management',
  templateUrl: './location-list-management.component.html',
  styleUrls: ['./location-list-management.component.css']
})
export class LocationListManagementComponent implements OnInit {
    @Input() houseLocations: any;

  constructor(
      private fireBaseService: FirebaseService

  ) { }

  async ngOnInit(): Promise<void> {
      this.houseLocations = await this.fireBaseService.getHousingList();

  }

    removeLocation(id: string) {
        this.fireBaseService.deleteData(id)
    }
}
