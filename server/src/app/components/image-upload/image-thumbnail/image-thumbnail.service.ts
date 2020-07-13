import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageThumbnailService {
  url = "http://localhost:3000/api/detect";


  @Output() change: EventEmitter<File> = new EventEmitter();

  constructor(private http: HttpClient) { }

  startUpload(file: File) {

    let formData = new FormData();
    formData.append('images', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', this.url, formData, options);
    this.http.request(req).subscribe((data) => {
      if (data instanceof HttpResponse) {
        this.change.emit(file);
        console.log(data);
      }
    });
  }
}
