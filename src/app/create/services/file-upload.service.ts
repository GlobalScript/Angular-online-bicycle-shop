import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/uploads';
  fileUrl: string = '';
  fileUpload!: File;
  percentage: number = 0;
  imageSrc: string = '';
  randomImageId!: string;
  disabledSelectImg: boolean = true;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(): AngularFireUploadTask {
    this.randomImageId = '';
    const random: string = Date.now().toString(36) + Math.random().toString(36);
    this.randomImageId = random;
    const filePath = `${this.basePath}/${this.fileUpload.name}-${random}`;
    const uploadTask = this.storage.upload(filePath, this.fileUpload);
    uploadTask.percentageChanges().subscribe(
      percentage => {
        this.percentage = Math.round(percentage ? percentage : 0);
      });
    return uploadTask;
  }

  getUrlFile(): Promise<string> {
    const storage = getStorage();
    const filePath = `${this.basePath}/${this.fileUpload.name}-${this.randomImageId}`;
    return getDownloadURL(ref(storage, filePath))
  }

  deleteFileByUrl(downloadURL: string): void {
    this.storage.refFromURL(downloadURL).delete();
  }

  clearUploadForm(): void {
    this.fileUrl = '';
    this.percentage = 0;
    this.imageSrc = '';
    this.disabledSelectImg = true;
  }
}
