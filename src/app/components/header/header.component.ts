import {Component} from '@angular/core';
import {FilterLocationValueService} from "../../services/filter-location-value.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    private subscription?: Subscription;
    constructor(
        private filterService: FilterLocationValueService
    ) {
    }
    setFilterValue({target}: Event) {
        const value = (target as HTMLInputElement).value;
        this.filterService.setNewValue(value)
    }
}
