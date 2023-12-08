import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../services/auth.service";

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent {
	email?: string;
	password?: string;
	error = false;

	constructor(private dialogRef: MatDialogRef<LoginComponent>, private auth: AuthService) {}

	login() {
		this.error = false;
		if(!this.email || !this.password) {
			this.error = true;
			return;
		}

		this.auth.loginWithEmail(this.email, this.password)
			.then(user => user ? this.dialogRef.close() : this.error = true)
			.catch(err => (this.error = true));
	}
}
