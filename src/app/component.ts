import {AngularFirestoreDocument} from "@angular/fire/firestore";

export interface Component {
  ref?: AngularFirestoreDocument

  price: number;
  createdOn: Date;
  description: string;
  id: string;
  name: string;
}
