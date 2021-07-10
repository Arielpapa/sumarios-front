import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumariosComponent } from './sumarios.component';

describe('SumariosComponent', () => {
  let component: SumariosComponent;
  let fixture: ComponentFixture<SumariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
