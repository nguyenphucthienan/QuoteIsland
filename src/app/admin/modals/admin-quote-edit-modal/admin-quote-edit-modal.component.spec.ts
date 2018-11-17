import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuoteEditModalComponent } from './admin-quote-edit-modal.component';

describe('AdminQuoteEditModalComponent', () => {
  let component: AdminQuoteEditModalComponent;
  let fixture: ComponentFixture<AdminQuoteEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuoteEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuoteEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
