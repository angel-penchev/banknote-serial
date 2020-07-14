import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../image-upload/image-thumbnail/image-upload.service';
import { HttpParams, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { EditComponent } from './edit/edit.component';
import { faEdit, faImage } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  name: string;
  serial: string;
}

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.scss']
})
export class PredictionListComponent implements OnInit {
  predictionList: any;
  page = 0;
  expanded = false;

  fa = {
    edit: faEdit,
    image: faImage
  }

  constructor(
    private imageUploadService: ImageUploadService,
    private http: HttpClient,
    public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.refreshList();
      this.imageUploadService.change.subscribe(() => {
        this.refreshList();
      });
    }

    refreshList() {
      this.predictionList = null;

      let formData = new FormData();
      let params = new HttpParams();
      const options = {
        params: params,
        reportProgress: true,
      };

      let url = "http://localhost:3000/api/detect?page=" + this.page + "&size=8";
      const req = new HttpRequest('GET', url, formData, options);
      this.http.request(req).subscribe((res) => {
        if (res instanceof HttpResponse) {
          let d: any = res.body;
          this.predictionList = d.data;
        }
      });
    }

  expandList() {
    this.expanded = !this.expanded;
  }

  prevPage() {
    this.page -= 1;
    this.refreshList();
  }

  nextPage() {
    this.page += 1;
    this.refreshList();
  }

  openImagePreviewDialog() {
    this.dialog.open(ImagePreviewComponent);
  }

  openEditDialog(id: string, name: string, serial: string) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      backdropClass: 'dialog-background',
      data: {name: name, serial: serial}
    });

    dialogRef.afterClosed().subscribe(result => {
      name = result.name;
      serial = result.serial;

      let formData = new FormData();
      let params = new HttpParams();
      const options = {
        params: params,
        reportProgress: true,
      };

      let url = "http://localhost:3000/api/detect?id=" + id + "&serial=" + serial + "&name=" + name ;
      const req = new HttpRequest('PATCH', url, formData, options);
      this.http.request(req).subscribe((res) => {

        if (res instanceof HttpResponse) {
          this.refreshList();
        }
      });
    });
  }
}
