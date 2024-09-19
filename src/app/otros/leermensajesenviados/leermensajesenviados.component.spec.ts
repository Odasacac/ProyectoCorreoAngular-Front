import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeermensajesenviadosComponent } from './leermensajesenviados.component';

describe('LeermensajesenviadosComponent', () => {
  let component: LeermensajesenviadosComponent;
  let fixture: ComponentFixture<LeermensajesenviadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeermensajesenviadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeermensajesenviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
