import {Injectable} from "@angular/core";
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {Component} from "../models/component";
import {Formula} from "../models/formula";

@Injectable({
	providedIn: 'root'
})
export class AppService {
	components = new BehaviorSubject<Component[]>([]);
	formulas = new BehaviorSubject<Formula[]>([]);

	constructor(private db: AngularFirestore) {
		this.db.collection('formulas', row => row.orderBy('name')).snapshotChanges().pipe(
			map((snaps: any[]) => snaps.map(snap => Object.assign({
				id: snap.payload.doc.id,
				ref: snap.payload.doc.ref
			}, snap.payload.doc.data())))
		).subscribe(formulas => this.formulas.next(formulas));

		this.db.collection('components', row => row.orderBy('name')).snapshotChanges().pipe(
			map((snaps: any[]) => snaps.map(snap => Object.assign({
				id: snap.payload.doc.id,
				ref: snap.payload.doc.ref
			}, snap.payload.doc.data())))
		).subscribe(components => this.components.next(components));
	}
}
