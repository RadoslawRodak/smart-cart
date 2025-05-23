import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewListComponent } from './new-list.component';

describe('NewListComponent', () => {
  let component: NewListComponent;
  let fixture: ComponentFixture<NewListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NewListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
