import {Injectable} from "@angular/core";
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {BehaviorSubject, from} from "rxjs";
import {flatMap, map, skip, take} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user = new BehaviorSubject<any>(null);

	constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
		this.afAuth.user.pipe(
			flatMap((user: any) => {
				if(!user) return from([false]);
				let ref = this.db.collection('users').doc(user.uid);
				return ref.valueChanges().pipe(map(dbUser => Object.assign({ref: ref}, user, dbUser)));
			})
		).subscribe(user => this.user.next(user));
	}

	async loginWithEmail(email: string, password: string) {
		let user = this.user.pipe(skip(1), take(1)).toPromise();
		await this.afAuth.signInWithEmailAndPassword(email, password);
		return await user;
	}

	async logout() {
		await this.afAuth.signOut();
	}

	resetPassword(emailOrCode?: string, password?: string) {
		if(password) {
			this.afAuth.confirmPasswordReset(<string>emailOrCode, password);
		} else {
			this.afAuth.sendPasswordResetEmail(emailOrCode ? emailOrCode : this.user.value.email);
		}
	}
}
