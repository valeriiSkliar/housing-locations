import { Injectable } from '@angular/core';
import  {HousingLocation} from "./housing-location";
import {ContentfulService} from "./contentful.service";


@Injectable({
  providedIn: 'root'
})
export class HousingService {
  protected housingLocationList:HousingLocation[] = [
    {
      "id": 1,
      "name": "Sunset Apartments",
      "city": "Los Angeles",
      "state": "CA",
      "photo": "/assets/sunset.jpg",
      "availableUnits": 8,
      "wifi": true,
      "laundry": true
    },
    {
      "id": 2,
      "name": "Cityscape Towers",
      "city": "New York City",
      "state": "NY",
      "photo": "/assets/cityscape.jpg",
      "availableUnits": 12,
      "wifi": true,
      "laundry": true
    },
    {
      "id": 3,
      "name": "Seaside Villas",
      "city": "Miami",
      "state": "FL",
      "photo": "/assets/seaside.jpg",
      "availableUnits": 6,
      "wifi": true,
      "laundry": true
    },
    {
      "id": 4,
      "name": "Mountain View Estates",
      "city": "Denver",
      "state": "CO",
      "photo": "/assets/mountain-view.jpg",
      "availableUnits": 10,
      "wifi": true,
      "laundry": true
    },
    {
      "id": 5,
      "name": "Urban Loft Residences",
      "city": "San Francisco",
      "state": "CA",
      "photo": "/assets/urban-loft.jpg",
      "availableUnits": 5,
      "wifi": true,
      "laundry": true
    },
    {
      id: 6,
      name: "Downtown Condos",
      city: "Seattle",
      state: "WA",
      photo: "/assets/downtown-condos.jpg",
      availableUnits: 3,
      wifi: true,
      laundry: true
    },
    {
      id: 7,
      name: "Beachfront Retreat",
      city: "Miami",
      state: "FL",
      photo: "/assets/beachfront-retreat.jpg",
      availableUnits: 7,
      wifi: true,
      laundry: false
    },
    {
      id: 8,
      name: "Lakeview Apartments",
      city: "Chicago",
      state: "IL",
      photo: "/assets/lakeview-apartments.jpg",
      availableUnits: 10,
      wifi: true,
      laundry: true
    },
    {
      id: 9,
      name: "Luxury Skyline Tower",
      city: "New York City",
      state: "NY",
      photo: "/assets/luxury-tower.jpg",
      availableUnits: 2,
      wifi: true,
      laundry: true
    },
    {
      id: 10,
      name: "Countryside Estates",
      city: "Dallas",
      state: "TX",
      photo: "/assets/countryside-estates.jpg",
      availableUnits: 5,
      wifi: true,
      laundry: true
    }
  ]
  constructor(
    private contentfulService: ContentfulService
  ) { }
  getAllHousingLocations(): HousingLocation[] {
    // this.housingLocationList = this.convertData()
    return this.housingLocationList;
  }

  getHousingLocationsById(id: number) : HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email)
  }

  private convertData():HousingLocation[] {
    const data = this.contentfulService.testMeth()
    return []
  }

    addLocation(name: string, photo: string, city: string, state: string, availableUnits: number, wifi: boolean, laundry: boolean) {

        console.log(name)
        console.log(wifi)
        console.log(photo)
    }
}
