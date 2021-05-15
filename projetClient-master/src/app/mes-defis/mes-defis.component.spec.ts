import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDefisComponent } from './mes-defis.component';

describe('MesDefisComponent', () => {
  let component: MesDefisComponent;
  let fixture: ComponentFixture<MesDefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesDefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
