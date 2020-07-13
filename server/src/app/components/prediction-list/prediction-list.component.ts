import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../image-upload/image-thumbnail/image-upload.service';
import { HttpParams, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.scss']
})
export class PredictionListComponent implements OnInit {
  predictionList: any;
  page = 0;
  expanded = true;

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

  openDialog() {
    const dialogRef = this.dialog.open(ImagePreviewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("ayy");
    });
  }
}
