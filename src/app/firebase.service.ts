import {Injectable, OnInit} from '@angular/core';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, onValue, set, update, remove} from "firebase/database";
import {HousingLocation} from "./housing-location";
import {environment} from "../environments/environment";
import {Router} from "@angular/router";

export interface LocationInterface {
    name: string,
    photo: string,
    city: string,
    state: string,
    availableUnits: number,
    wifi: boolean,
    laundry: boolean,
    id: number
}

const firebaseConfig = {
    apiKey: environment.apiKey,
    authDomain: environment.authDomain,
    databaseURL: environment.databaseURL,
    projectId: environment.projectId,
    storageBucket: environment.storageBucket,
    messagingSenderId: environment.messagingSenderId,
    appId: environment.appId
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase();

@Injectable({
    providedIn: 'root'
})
export class FirebaseService implements OnInit{
    housingList: unknown = [];

    constructor(
        private router: Router,
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.housingList = await this.getHousingList()
    }

    async getHousingList(): Promise<unknown> {
        await this.loadData().then(data => {
            this.housingList = data;
        });
        return this.housingList;
    }
    getHousingLocationsById(id: number) : HousingLocation | undefined {
        if (!(this.housingList as[]).length) {
            this.router.navigate([''])
            return;
        }
        // @ts-ignore
        return this.housingList.find(housingLocation => housingLocation.id === id);
    }
    loadData() {
        return new Promise((resolve, reject) => {
            const starCountRef = ref(database, 'properties');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(Object.values(data));
            }, (error) => {
                reject(error);
            });
        });
    }

    submitApplication(firstName: string, lastName: string, email: string, housingLocationId: number | string) {
        console.log(this.housingList)
        set(ref(database, `form_response/${housingLocationId}`), {
                firstName,
                lastName,
                email,
                housingLocationId
        });
    }

    addLocation(location: LocationInterface) {
        set(ref(database, `properties/property${(this.housingList as []).length + 1}`), location)
            .then(() => {
                // @ts-ignore
                (this.housingList as []).push(location);
            });
    }

    updateData(id: string, data: Partial<HousingLocation>) {
        update(ref(database, `properties/property${id}`), data)
            .then(() => {
                // Optionally update the local housingList too.
                const index = (this.housingList as []).findIndex((housing: HousingLocation) => housing.id === Number(id));
                if (index !== -1) {
                    // @ts-ignore
                    this.housingList[index] = { ...this.housingList[index], ...data };
                }
            });
    }

    deleteData(id: string) {
        remove(ref(database, `properties/property${id}`))
            .then(() => {
                // Optionally remove the location from the local housingList too.
                const index = (this.housingList as []).findIndex((housing: HousingLocation) => housing.id === Number(id));
                if (index !== -1) {
                    (this.housingList as []).splice(index, 1);
                }
            });
    }
}
