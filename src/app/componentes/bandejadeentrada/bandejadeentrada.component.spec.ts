import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejadeentradaComponent } from './bandejadeentrada.component';

describe('BandejadeentradaComponent', () => {
  let component: BandejadeentradaComponent;
  let fixture: ComponentFixture<BandejadeentradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandejadeentradaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejadeentradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
