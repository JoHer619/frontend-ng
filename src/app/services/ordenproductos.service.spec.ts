import { TestBed } from '@angular/core/testing';

import { OrdenproductosService } from './ordenproductos.service';

describe('OrdenproductosService', () => {
  let service: OrdenproductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenproductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
