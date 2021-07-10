import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuzgadosComponent } from './juzgados.component';

describe('JuzgadosComponent', () => {
  let component: JuzgadosComponent;
  let fixture: ComponentFixture<JuzgadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuzgadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuzgadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
