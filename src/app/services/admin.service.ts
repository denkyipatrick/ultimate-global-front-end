import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  loggedInAdmin: any;

  constructor(private constants: ConstantsService, private http: HttpClient) {
    this.loggedInAdmin = JSON.parse(localStorage.getItem('admin'));
  }

  createAdmin(data: any) {
    return this.http.post(`${this.constants.ADMINS_URL}`, data);
  }

  signInAdmin(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.constants.ADMINS_URL}/auth`, 
    { username: username, password: password });
  }

  fetchAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.constants.ADMINS_URL}`);
  }

  changeName(username: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.constants.ADMINS_URL}/` + 
    `${username}/change-name`, data);
  }

  changePassword(username: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.constants.ADMINS_URL}/` + 
    `${username}/change-password`, data);
  }

  fetchDistributors() {
    return this.http.get<any[]>(`${this.constants.DISTRIBUTORS_URL}`);
  }

  fetchDistributor(username: string) {
    return this.http.get<any>(`${this.constants.DISTRIBUTORS_URL}/${username}`);    
  }

  fetchDepositTransactions() {
    return this.http.get<any[]>(`${this.constants.ADMINS_URL}/` + 
    `wallet-transactions/deposits`);
  }

  fetchWithdrawalTransactions() {
    return this.http.get<any[]>(`${this.constants.ADMINS_URL}/` + 
    `wallet-transactions/withdrawals`);
  }

  fetchTransaction(transactionId: string) {
    return this.http.get<any>(`${this.constants.ADMINS_URL}/` + 
    `wallet-transactions/${transactionId}`);
  }

  setTransactionAsPaid(transactionId: string) {
    return this.http.patch(`${this.constants.ADMINS_URL}/` + 
    `wallet-transactions/${transactionId}/set-as-paid`, null);
  }

  replyMessage(data: any) {
    return this.http.post<any>(`${this.constants.NOTIFICATIONS_URL}`, data);
  }

  postGeneralNews(data: any) {
    return this.http.post<any>(`${this.constants.ADMIN_NEWS_URL}`, data);    
  }

  fetchLatestAdminNews() {
    return this.http.get<any>(`${this.constants.ADMIN_NEWS_URL}/latest`);
  }

  fetchMessages() {
    return this.http.get<any[]>(`${this.constants.MESSAGES_URL}`)
  }

  fetchMessage(messageId: string) {
    return this.http.get<any>(`${this.constants.MESSAGES_URL}/${messageId}`);
  }

  setMessageAsViewed(messageId: string) {
    return this.http.patch<any>(`${this.constants.MESSAGES_URL}/${messageId}/set-as-viewed`, null);
  }
}
