import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactarmensajesComponent } from './redactarmensajes.component';

describe('RedactarmensajesComponent', () => {
  let component: RedactarmensajesComponent;
  let fixture: ComponentFixture<RedactarmensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactarmensajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedactarmensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
