import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryEditModalComponent } from './admin-category-edit-modal.component';

describe('AdminCategoryEditModalComponent', () => {
  let component: AdminCategoryEditModalComponent;
  let fixture: ComponentFixture<AdminCategoryEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
