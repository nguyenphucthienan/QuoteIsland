import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuoteManagerComponent } from './admin-quote-manager.component';

describe('AdminQuoteManagerComponent', () => {
  let component: AdminQuoteManagerComponent;
  let fixture: ComponentFixture<AdminQuoteManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuoteManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuoteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
