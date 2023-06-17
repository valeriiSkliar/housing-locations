import { Injectable } from '@angular/core';
import {HousingLocation} from "../housing-location";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    filteredLocationList: HousingLocation[] = [];


  constructor(

  ) { }

    filterResults(value: string, housingList: any): HousingLocation[] {
        return [...housingList].filter(
            housingLocationList => housingLocationList?.city.toLowerCase().includes(value.toLowerCase())
        );
    }
}
