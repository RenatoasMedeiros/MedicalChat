/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VideoChatService } from './videoChat.service';

describe('Service: VideoChat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoChatService]
    });
  });

  it('should ...', inject([VideoChatService], (service: VideoChatService) => {
    expect(service).toBeTruthy();
  }));
});
