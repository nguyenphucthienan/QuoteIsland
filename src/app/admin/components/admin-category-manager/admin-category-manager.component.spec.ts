import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryManagerComponent } from './admin-category-manager.component';

describe('AdminCategoryManagerComponent', () => {
  let component: AdminCategoryManagerComponent;
  let fixture: ComponentFixture<AdminCategoryManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
