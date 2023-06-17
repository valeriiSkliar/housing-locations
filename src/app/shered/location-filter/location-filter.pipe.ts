import { Pipe, PipeTransform } from '@angular/core';
import {HousingLocation} from "../../housing-location";

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {

  transform(items: HousingLocation[], field = 'city', value: string ): HousingLocation[] {
      if (!items) return [];
      if (!field || !value) return items;

      return items.filter((singleItem) => singleItem[field].toLowerCase().includes(value.toLowerCase()));
  }

}
