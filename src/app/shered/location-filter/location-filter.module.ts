import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationFilterPipe } from './location-filter.pipe';



@NgModule({
  declarations: [
    LocationFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocationFilterPipe
  ]
})
export class LocationFilterModule { }
