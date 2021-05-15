import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoChamisComponent } from './info-chamis.component';

describe('InfoChamisComponent', () => {
  let component: InfoChamisComponent;
  let fixture: ComponentFixture<InfoChamisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoChamisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoChamisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
