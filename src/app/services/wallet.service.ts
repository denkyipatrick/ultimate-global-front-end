import { ConstantsService } from './constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private constants: ConstantsService,
    private http: HttpClient) { }

  createTransaction(data: any) {
    return this.http.post(`${this.constants.WALLET_TRANSACTIONS_URL}`, data);
  }

  fetchWalletTransactions(walletId: string) {
    return this.http.get<any[]>(`${this.constants.WALLETS_URL}/${walletId}/transactions`);
  }
}
