import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositTransactionsComponent } from './deposit-transactions.component';

describe('DepositTransactionsComponent', () => {
  let component: DepositTransactionsComponent;
  let fixture: ComponentFixture<DepositTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
