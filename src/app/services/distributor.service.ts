import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  distributor: any;

  constructor(
    private constants: ConstantsService, 
    private http: HttpClient, 
    private router: Router) {
    this.distributor = JSON.parse(localStorage.getItem('distributor'));

    if (!this.distributor && !(window.location.href.indexOf('sign-in') > -1)) {
      // alert('Your session has expired. Please sign in.');
      // this.router.navigate(['/']);
    }
  }
  
  changeContactDetails(username: string, data: any) {
    return this.http.patch<any>(`${this.constants.DISTRIBUTORS_URL}/` + 
    `${username}/change-contact-details`, data);    
  }

  changeBankDetails(username: string, data: any) {
    return this.http.patch<any>(`${this.constants.DISTRIBUTORS_URL}/` + 
    `${username}/change-bank-details`, data);    
  }

  changeName(username: string, data: any) {
    return this.http.patch<any>(`${this.constants.DISTRIBUTORS_URL}/` + 
    `${username}/change-name`, data);
  }
  
  changePassword(username: string, data: any) {
    return this.http.patch<any>(`${this.constants.DISTRIBUTORS_URL}/` + 
    `${username}/change-password`, data);
  }

  setWalletPin(walletId: string, data: any) {
    return this.http.patch<any>(`${this.constants.WALLETS_URL}/${walletId}/set-pin`, data);
  }
  
  changeWalletPin(walletId: string, data: any) {
    return this.http.patch<any>(`${this.constants.WALLETS_URL}/${walletId}/change-pin`, data);
  }

  fetchRecentDownLines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.constants.DISTRIBUTORS_URL}/` + 
    `${this.distributor.username}/recent-downlines`);
  }

  fetchLeftRightTotalDownLinesCounts() {
    return this.http.get<any>(`${this.constants.DISTRIBUTORS_URL}/` + 
    `${this.distributor.username}/total-downlines`);    
  }

  fetchNotifications() {
    return this.http.get<any>(`${this.constants.DISTRIBUTORS_URL}/` +
    `${this.distributor.username}/notifications`);
  }

  addDistributor(data: any): Observable<any> {
    return this.http.post(`${this.constants.DISTRIBUTORS_URL}`, data)
  }

  getDownLineGeneration(distributorUsername, stage: string): Observable<any> {
    return this.http.get(`${this.constants.DISTRIBUTORS_URL}/` + 
    `${distributorUsername}/generations/${stage.toLowerCase()}`);
  }

  sendAdminMessage(message: any) {
    return this.http.post<any>(`${this.constants.MESSAGES_URL}`, message);
  }
}
