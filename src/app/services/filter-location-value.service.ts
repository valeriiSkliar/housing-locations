import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterLocationValueService {
    filterTerm$ = new BehaviorSubject('');
  constructor() { }

    setNewValue(value: string) {
        this.filterTerm$.next(value);
    }
}
