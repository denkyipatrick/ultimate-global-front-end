import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWalletPinDialogComponent } from './new-wallet-pin-dialog.component';

describe('NewWalletPinDialogComponent', () => {
  let component: NewWalletPinDialogComponent;
  let fixture: ComponentFixture<NewWalletPinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWalletPinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWalletPinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
