import {Injectable, OnInit} from '@angular/core';
import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { createClient, Entry } from 'contentful';
// import * as contentful from 'contentful';
import {HousingLocation} from "./housing-location";
import firebase from "firebase/compat";
import Firestore = firebase.firestore.Firestore;
import { getDatabase, ref, onValue} from "firebase/database";




const firebaseConfig = {
  apiKey: "AIzaSyBBZ5xVa-M_lOIEWwuGNC3kIrp9dSzh36Q",
  authDomain: "fir-simpleapp-8ef03.firebaseapp.com",
  databaseURL: "https://fir-simpleapp-8ef03-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-simpleapp-8ef03",
  storageBucket: "fir-simpleapp-8ef03.appspot.com",
  messagingSenderId: "502728938977",
  appId: "1:502728938977:web:09645064b8bccc4cf9aea0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

// const db = getFirestore(app);
@Injectable({
  providedIn: 'root'
})
export class ContentfulService implements OnInit{
  // private cdaClient = contentful.createClient({
  //   space: CONFIG.space,
  //   accessToken: CONFIG.accessToken
  // });
  // private app = initializeApp(firebaseConfig);
  // db = getFirestore(this.app);
  constructor() { }

  async getCities(db: Firestore) {
    // @ts-ignore
    // const houses = collection(db, 'HousingLocation');
    // const houseSnapshot = await getDocs(houses);
    // const houseList = houseSnapshot.docs.map(doc => doc.data());
    // console.log(houseList)
    // return houseList;
  }

  ngOnInit(): void{

    // @ts-ignore
    // this.getCities(this.db).then(r => console.log(r))
  }
  // getProducts(query?: object): Promise<contentful.Entry<any>[]> {
  //   return this.cdaClient.getEntries(Object.assign({
  //     content_type: CONFIG.contentTypeIds.product
  //   }, query))
  //     .then(res => res.items);
  // }
  testMeth() {
    const starCountRef = ref(database, 'properties');
    console.log(starCountRef)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
    });
  }
}

