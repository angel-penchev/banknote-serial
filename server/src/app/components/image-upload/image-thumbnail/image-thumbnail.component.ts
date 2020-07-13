import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ImageThumbnailService } from './image-upload.service'

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss']
})
export class ImageThumbnailComponent implements OnInit {
  @Input() file: File;
  imgURL: any;
  elementOpacity = 1.0;
  elementDisplay = "inline-block";

  constructor(
    private imageThumbnailService: ImageThumbnailService
  ) {}

  ngOnInit(): void {
    this.generateThumbnail(this.file);

    this.imageThumbnailService.startUpload(this.file);
    this.imageThumbnailService.change.subscribe(async (uploadedFile) => {
      if (this.file === uploadedFile) {
        this.imgURL = "https://bit.ly/32ccZGA"
      } else {
        this.imgURL = "https://bit.ly/30coDyO"
      }
      await this.delay(500);
      this.elementOpacity = 0.0;
      await this.delay(300);
      this.elementDisplay = "none";
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  generateThumbnail(file) {
    if (file.length === 0)
      return;

    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


}
