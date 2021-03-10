import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageDownLinesComponent } from './stage-down-lines.component';

describe('StageDownLinesComponent', () => {
  let component: StageDownLinesComponent;
  let fixture: ComponentFixture<StageDownLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageDownLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDownLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
