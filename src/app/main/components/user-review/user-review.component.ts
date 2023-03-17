import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { Review } from '../../interfaces/review';
import { ReviewService } from '../../services/review.service';


@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {
  currentRate = 0;
  form!: FormGroup;
  key: string = this.activateRoute.snapshot.params['id'];

  constructor(
    public auth: AuthService,
     private user: UsersService,
      private reviewService: ReviewService,
      private activateRoute: ActivatedRoute,
      ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "firstName": new FormControl(this.user.userName,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      'lastName': new FormControl(this.user.userSurname,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      'review': new FormControl('',
        [
          Validators.required,
          Validators.minLength(2)
        ])
    });
  }

  get firstName() { return this.form.get('firstName') }
  get lastName() { return this.form.get('lastName') }
  get review() { return this.form.get('review') }


  reviewSubmit() {
    const userReview: Review = {
      author: `${this.form.value.firstName} ${this.form.value.lastName}`,
      text: this.form.value.review,
      rating: this.currentRate,
      date: new Date().toLocaleString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}),
      email: this.user.userData.email
    }
    this.reviewService.addUserReview(this.key, userReview)
    this.form.reset()
    this.firstName?.setValue(this.user.userName)
    this.lastName?.setValue(this.user.userSurname)
  }
}
