import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaComponent } from './estadistica.component';

describe('EstadisticaComponent', () => {
  let component: EstadisticaComponent;
  let fixture: ComponentFixture<EstadisticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
