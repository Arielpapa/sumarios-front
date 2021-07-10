import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosComponent } from './tecnicos.component';

describe('TecnicosComponent', () => {
  let component: TecnicosComponent;
  let fixture: ComponentFixture<TecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
