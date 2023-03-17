import { Injectable } from '@angular/core';
import { BikeResponse } from 'src/app/main/interfaces/bike-response';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map, take, first, startWith, single } from 'rxjs';
import { Review } from '../interfaces/review';
import { CrudService } from 'src/app/create/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  bikeListRef!: AngularFireList<BikeResponse>;

  constructor(private db: AngularFireDatabase, private crud: CrudService) {
    this.bikeListRef = db.list('bikes');
  }

  getBikeByKey(key: string): Observable<BikeResponse> {
    return this.db.list('bikes', ref => ref.orderByKey().equalTo(key))
      .valueChanges()
      .pipe(first(), map(prod => prod[0] as BikeResponse
      ));
  }

  updateReview(key: string, reviews: Review[]): AngularFireList<BikeResponse> {
    this.bikeListRef.update(key, {review: reviews})
    .then(()=> this.crud.prodDataByKey(key));
    return this.bikeListRef;
  }

  addUserReview(key: string, userReview: Review) {
    this.getBikeByKey(key).subscribe(data => {
      const reviews: Review[] = data.review;
      reviews.unshift(userReview)
      this.updateReview(key, reviews)
    })
  }
}
