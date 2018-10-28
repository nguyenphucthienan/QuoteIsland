import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorManagerComponent } from './admin-author-manager.component';

describe('AdminAuthorManagerComponent', () => {
  let component: AdminAuthorManagerComponent;
  let fixture: ComponentFixture<AdminAuthorManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthorManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
