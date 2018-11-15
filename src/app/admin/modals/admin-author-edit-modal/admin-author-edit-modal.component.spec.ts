import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorEditModalComponent } from './admin-author-edit-modal.component';

describe('AdminAuthorEditModalComponent', () => {
  let component: AdminAuthorEditModalComponent;
  let fixture: ComponentFixture<AdminAuthorEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthorEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
