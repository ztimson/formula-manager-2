import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthService} from "../auth.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  email: string;
  error = false;
  password: string;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private auth: AuthService) {}

  login() {
    this.error = false;
    this.auth.loginWithEmail(this.email, this.password)
      .then(user => user ? this.dialogRef.close() : this.error = true)
      .catch(err => (this.error = true));
  }
}
