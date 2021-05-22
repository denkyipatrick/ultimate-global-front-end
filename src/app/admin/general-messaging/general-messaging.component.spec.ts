import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMessagingComponent } from './general-messaging.component';

describe('GeneralMessagingComponent', () => {
  let component: GeneralMessagingComponent;
  let fixture: ComponentFixture<GeneralMessagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralMessagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
