import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs";
import {Formula} from "./formula";
import {Component} from "./component";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  components = new BehaviorSubject<Component[]>([]);
  formulas = new BehaviorSubject<Formula[]>([]);

  constructor(private db: AngularFirestore) {
    this.db.collection<Formula>('formulas', row => row.orderBy('name')).snapshotChanges().pipe(
      map(snaps => snaps.map(snap => Object.assign({id: snap.payload.doc.id, ref: snap.payload.doc.ref}, snap.payload.doc.data())))
    ).subscribe(formulas => this.formulas.next(formulas));

    this.db.collection<Component>('components', row => row.orderBy('name')).snapshotChanges().pipe(
      map(snaps => snaps.map(snap => Object.assign({id: snap.payload.doc.id, ref: snap.payload.doc.ref}, snap.payload.doc.data())))
    ).subscribe(components => this.components.next(components));
  }
}
