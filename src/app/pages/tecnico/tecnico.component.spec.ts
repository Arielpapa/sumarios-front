import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoComponent } from './tecnico.component';

describe('TecnicoComponent', () => {
  let component: TecnicoComponent;
  let fixture: ComponentFixture<TecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
