import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { ImageTypes } from '../../enums/image-types';
import { CrudService } from '../../services/crud.service';


@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {

  errorFile: boolean = false;
  imageSrc: string = '';


  constructor(public uploadService: FileUploadService, private crud: CrudService) {
    this.uploadService.disabledSelectImg = false;
  }

  ngOnInit(): void {
    this.imageSrc = this.crud.editProdById?.imgUrl;
    this.uploadService.fileUrl = this.crud.editProdById?.imgUrl;
  }

  selectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File | null = files.item(0);
    if (!file) return;
    if (file.size < 1048576 && (file.type === ImageTypes.jpg || file.type === ImageTypes.png || file.type === ImageTypes.webp)) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.uploadService.imageSrc = reader.result as string;
        this.uploadService.disabledSelectImg = false;
      }
      this.uploadService.disabledSelectImg = false;
      this.uploadService.fileUpload = file;
      this.errorFile = false;
      return;
    }
    this.errorFile = true;
    this.uploadService.imageSrc = '';
    this.uploadService.disabledSelectImg = true;
    this.uploadService.disabledSelectImg = true;
  }
}
