import { TestBed } from '@angular/core/testing';

import { DatoscompartidosService } from './datoscompartidos.service';

describe('DatoscompartidosService', () => {
  let service: DatoscompartidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatoscompartidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
