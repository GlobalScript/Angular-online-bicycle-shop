import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CreateRoutingModule } from './create-routing.module';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { SharedModule } from '../shared/shared.module';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';

@NgModule({
  declarations: [
    CreatePageComponent,
    ImageUploadComponent,
    CreateProductComponent,
    PreviewCardComponent,
    EditPageComponent,
    EditProductComponent,
    EditImageComponent,
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
})
export class CreateModule { }
