/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Visite_en_coursComponent } from './visite_en_cours.component';

describe('Visite_en_coursComponent', () => {
  let component: Visite_en_coursComponent;
  let fixture: ComponentFixture<Visite_en_coursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Visite_en_coursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Visite_en_coursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
