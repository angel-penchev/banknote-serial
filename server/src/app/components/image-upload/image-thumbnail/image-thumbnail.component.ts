import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss']
})
export class ImageThumbnailComponent implements OnInit {
  @Input() file: File;
  imgURL: any;

  constructor() {
  }

  ngOnInit(): void {
    this.generateThumbnail(this.file);
    this.startUpload();
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

  startUpload() {
    console.log(this.file);
  }
}
