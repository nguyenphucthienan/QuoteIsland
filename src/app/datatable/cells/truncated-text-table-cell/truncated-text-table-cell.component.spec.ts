import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedTextTableCellComponent } from './truncated-text-table-cell.component';

describe('TruncatedTextTableCellComponent', () => {
  let component: TruncatedTextTableCellComponent;
  let fixture: ComponentFixture<TruncatedTextTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruncatedTextTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncatedTextTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
