import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileDropzoneDirective } from './file-dropzone.directive';
import { HttpClientModule } from '@angular/common/http';
import { ImageThumbnailComponent } from './components/image-upload/image-thumbnail/image-thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    NavbarComponent,
    FileDropzoneDirective,
    ImageThumbnailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
