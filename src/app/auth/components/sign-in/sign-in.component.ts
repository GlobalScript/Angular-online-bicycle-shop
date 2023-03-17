import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form!: FormGroup;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "email": new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      'password': new FormControl('',
        [
          Validators.required
        ]),
    });
  }

  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

  submit() {
    this.auth.signIn(this.form.value.email.toLowerCase(), this.form.value.password);
    this.form.reset();
  }

}
