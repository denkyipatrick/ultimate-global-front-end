import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationDetailComponent } from './generation-detail.component';

describe('GenerationDetailComponent', () => {
  let component: GenerationDetailComponent;
  let fixture: ComponentFixture<GenerationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
