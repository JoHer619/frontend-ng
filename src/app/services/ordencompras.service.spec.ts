import { TestBed } from '@angular/core/testing';

import { OrdencomprasService } from './ordencompras.service';

describe('OrdencomprasService', () => {
  let service: OrdencomprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdencomprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
