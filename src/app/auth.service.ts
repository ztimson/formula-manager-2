import {Injectable} from "@angular/core";
import {BehaviorSubject, from} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {flatMap, map, skip, take, tap} from 'rxjs/operators';

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
        return ref.valueChanges().pipe(map(dbUser => Object.assign({ref: ref}, user, dbUser)))
      }),
      tap(user => console.log(user))
    ).subscribe(user => this.user.next(user));
  }

  async loginWithEmail(email: string, password: string) {
    let user = this.user.pipe(skip(1), take(1)).toPromise();
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return await user;
  }

  async logout() {
    await this.afAuth.auth.signOut();
  }

  resetPassword(emailOrCode?: string, password?: string) {
    if(password) {
      this.afAuth.auth.confirmPasswordReset(emailOrCode, password)
    } else {
      this.afAuth.auth.sendPasswordResetEmail(emailOrCode ? emailOrCode : this.user.value.email);
    }
  }
}
