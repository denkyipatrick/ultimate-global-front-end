import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWalletPinDialogComponent } from './change-wallet-pin-dialog.component';

describe('ChangeWalletPinDialogComponent', () => {
  let component: ChangeWalletPinDialogComponent;
  let fixture: ComponentFixture<ChangeWalletPinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeWalletPinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeWalletPinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
