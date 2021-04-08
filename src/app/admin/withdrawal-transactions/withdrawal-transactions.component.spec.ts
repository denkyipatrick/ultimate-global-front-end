import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalTransactionsComponent } from './withdrawal-transactions.component';

describe('WithdrawalTransactionsComponent', () => {
  let component: WithdrawalTransactionsComponent;
  let fixture: ComponentFixture<WithdrawalTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
