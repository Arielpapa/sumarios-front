import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuzgadoComponent } from './juzgado.component';

describe('JuzgadoComponent', () => {
  let component: JuzgadoComponent;
  let fixture: ComponentFixture<JuzgadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuzgadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuzgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
