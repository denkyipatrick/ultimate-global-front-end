import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  SERVER_URL = "http://localhost:4700/api";
  ADMINS_URL = `${this.SERVER_URL}/admins`;
  WALLETS_URL = `${this.SERVER_URL}/wallets`;
  MESSAGES_URL = `${this.SERVER_URL}/messages`;
  DISTRIBUTORS_URL = `${this.SERVER_URL}/distributors`;
  NOTIFICATIONS_URL = `${this.SERVER_URL}/notifications`;
  DISTRIBUTOR_STAGES_URL = `${this.SERVER_URL}/distributorlevels`;
  WALLET_TRANSACTIONS_URL = `${this.SERVER_URL}/wallettransactions`;

  constructor() { }
}
