import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorAddModalComponent } from './admin-author-add-modal.component';

describe('AdminAuthorAddModalComponent', () => {
  let component: AdminAuthorAddModalComponent;
  let fixture: ComponentFixture<AdminAuthorAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthorAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
