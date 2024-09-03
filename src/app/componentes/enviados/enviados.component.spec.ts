import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejadesalidaComponent } from './enviados.component';

describe('BandejadesalidaComponent', () => {
  let component: BandejadesalidaComponent;
  let fixture: ComponentFixture<BandejadesalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandejadesalidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejadesalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
