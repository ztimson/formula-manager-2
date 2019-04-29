import {Component} from './component';
import {AngularFirestoreDocument} from "@angular/fire/firestore";

export interface Formula {
  ref?: AngularFirestoreDocument;

  approved: boolean;
  approvedOn: Date;
  components: {component: Component; quantity: number}[];
  createdOn: Date;
  id: string;
  name: string;
}
