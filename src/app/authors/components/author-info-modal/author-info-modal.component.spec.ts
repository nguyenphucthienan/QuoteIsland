import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInfoModalComponent } from './author-info-modal.component';

describe('AuthorInfoModalComponent', () => {
  let component: AuthorInfoModalComponent;
  let fixture: ComponentFixture<AuthorInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
