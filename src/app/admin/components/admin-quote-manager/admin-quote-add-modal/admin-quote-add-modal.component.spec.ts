import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuoteAddModalComponent } from './admin-quote-add-modal.component';

describe('AdminQuoteAddModalComponent', () => {
  let component: AdminQuoteAddModalComponent;
  let fixture: ComponentFixture<AdminQuoteAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuoteAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuoteAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
