import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryAddModalComponent } from './admin-category-add-modal.component';

describe('AdminCategoryAddModalComponent', () => {
  let component: AdminCategoryAddModalComponent;
  let fixture: ComponentFixture<AdminCategoryAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
