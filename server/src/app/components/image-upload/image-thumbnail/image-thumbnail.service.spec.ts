import { TestBed } from '@angular/core/testing';

import { ImageThumbnailService } from './image-thumbnail.service';

describe('ImageThumbnailService', () => {
  let service: ImageThumbnailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageThumbnailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
