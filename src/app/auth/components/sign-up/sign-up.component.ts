import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "name": new FormControl('',
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      'surname': new FormControl('',
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      'email': new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      'password': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]),
    });
  }

  get name() { return this.form.get('name') }
  get surname() { return this.form.get('surname') }
  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

  submit() {
    const userData: User = {
      key: '',
      name: this.form.value.name,
      surname: this.form.value.surname,
      email: this.form.value.email.toLowerCase(),
      role: 'customer'
    }
    this.auth.signUp(userData, this.form.value.password);
    this.form.reset();
  }
}
