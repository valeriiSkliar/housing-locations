import { Component, OnInit, Input } from '@angular/core';
import {HousingLocation} from "../housing-location";

@Component({
  selector: 'app-housing-location',
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent implements OnInit {

  constructor() { }
  @Input() housingLocation!: HousingLocation;

  ngOnInit(): void {
  }

}
