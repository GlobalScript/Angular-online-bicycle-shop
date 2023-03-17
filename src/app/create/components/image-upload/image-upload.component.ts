import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { ImageTypes } from '../../enums/image-types';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})

export class ImageUploadComponent {

  errorFile: boolean = false;
  disabledSelectImg: boolean = true;

  constructor(public uploadService: FileUploadService) { }

  selectFile(event: Event) {
    this.uploadService.fileUrl = '';
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File | null = files.item(0);
    if (!file) return;
    if (file.size < 1048576 && (file.type === ImageTypes.jpg || file.type === ImageTypes.png || file.type === ImageTypes.webp)) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadService.imageSrc = reader.result as string;
      }
      this.uploadService.disabledSelectImg = false;
      this.uploadService.fileUpload = file;
      this.errorFile = false;
      return;
    }
    this.errorFile = true;
    this.uploadService.imageSrc = '';
    this.uploadService.disabledSelectImg = true;
  }
}
