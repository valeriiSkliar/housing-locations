export interface HousingLocation {
    [key:string]: any;
      id: number;
      name: string;
      city: string;
      state: string;
      photo: string;
      availableUnits: number;
      wifi: boolean;
      laundry: boolean;
}
