import { TestBed } from '@angular/core/testing';

import { SpectatorApiService } from './spectator-api.service';

describe('SpectatorApiService', () => {
  let service: SpectatorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpectatorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
