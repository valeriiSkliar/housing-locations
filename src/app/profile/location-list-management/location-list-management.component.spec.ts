import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListManagementComponent } from './location-list-management.component';

describe('LocationListManagementComponent', () => {
  let component: LocationListManagementComponent;
  let fixture: ComponentFixture<LocationListManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationListManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
