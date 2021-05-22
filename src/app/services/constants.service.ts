import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  SERVER_URL = environment.apiUrl;
  ADMINS_URL = `${this.SERVER_URL}/admins`;
  WALLETS_URL = `${this.SERVER_URL}/wallets`;
  MESSAGES_URL = `${this.SERVER_URL}/messages`;
  ADMIN_NEWS_URL = `${this.SERVER_URL}/admin-news`;
  DISTRIBUTORS_URL = `${this.SERVER_URL}/distributors`;
  NOTIFICATIONS_URL = `${this.SERVER_URL}/notifications`;
  DISTRIBUTOR_STAGES_URL = `${this.SERVER_URL}/distributorlevels`;
  WALLET_TRANSACTIONS_URL = `${this.SERVER_URL}/wallettransactions`;

  constructor() { }
}
