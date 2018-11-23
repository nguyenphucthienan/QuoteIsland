import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodSelectModalComponent } from './mood-select-modal.component';

describe('MoodSelectModalComponent', () => {
  let component: MoodSelectModalComponent;
  let fixture: ComponentFixture<MoodSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
