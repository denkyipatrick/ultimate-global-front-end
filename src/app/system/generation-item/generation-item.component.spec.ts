import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationItemComponent } from './generation-item.component';

describe('GenerationItemComponent', () => {
  let component: GenerationItemComponent;
  let fixture: ComponentFixture<GenerationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
