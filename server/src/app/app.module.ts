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
import { PredictionListComponent } from './components/prediction-list/prediction-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagePreviewComponent } from './components/prediction-list/image-preview/image-preview.component';
import { EditComponent } from './components/prediction-list/edit/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    NavbarComponent,
    FileDropzoneDirective,
    ImageThumbnailComponent,
    PredictionListComponent,
    ImagePreviewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
