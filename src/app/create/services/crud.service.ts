import { Injectable } from '@angular/core';
import { BikeResponse } from 'src/app/main/interfaces/bike-response';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Bike } from 'src/app/main/interfaces/bike';
import { FileUploadService } from './file-upload.service';
import { Observable, map,first } from 'rxjs';
import { ProductCardModel } from 'src/app/main/models/productCard.model';
import { Review } from 'src/app/main/interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  bikeListRef!: AngularFireList<BikeResponse>;
  editProdById!: Bike;
  detailProdById?: Bike;

  constructor(private db: AngularFireDatabase, private upload: FileUploadService) {
    this.bikeListRef = db.list('bikes');
  }

  addBike(bike: BikeResponse): AngularFireList<BikeResponse> {
    this.bikeListRef.push(bike)
    return this.bikeListRef;
  }

  getBikeByKey(id: string): Observable<Bike> {
    return this.db.list('bikes', ref => ref.orderByKey().equalTo(id))
      .valueChanges()
      .pipe(first(), map(prod => new ProductCardModel(prod[0] as BikeResponse).getCardData()
      ));
  }

  prodDataByKey(key: string): void {
    this.getBikeByKey(key).subscribe(data => this.detailProdById = data)
  }

  getBikeList(): Observable<Bike[]> {
    return this.bikeListRef.snapshotChanges()
      .pipe(map(list => list.map(item => (
        new ProductCardModel({ ...item.payload.toJSON(), id: item.key } as BikeResponse).getCardData()))
        .sort((a, b) => -a.discount - -b.discount)))
  }

getRewiewByKey(id: string) {
  return this.db.list('bikes', ref => ref.orderByKey().equalTo(id))
      .valueChanges()
      .pipe(first())
}

  updateBike(key: string, bike: BikeResponse): AngularFireList<BikeResponse> {
    this.bikeListRef.update(key, bike);
    return this.bikeListRef;
  }

  deleteBike(id: string, imgUrl: string) {
    this.bikeListRef.remove(id)
      .then(() => {
        this.upload.deleteFileByUrl(imgUrl);
      })
  }
}
