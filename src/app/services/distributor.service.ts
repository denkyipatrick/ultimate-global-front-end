import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  distributor: any;

  constructor(private constantsService: ConstantsService, private http: HttpClient) {
    this.distributor = JSON.parse(localStorage.getItem('distributor'));
  }

  addDistributor(data: any): Observable<any> {
    return this.http.post(`${this.constantsService.DISTRIBUTORS_URL}`, data)
  }

  getDownLineGeneration(distributorUsername, stage: string): Observable<any> {
    return this.http.get(`${this.constantsService.DISTRIBUTORS_URL}/` + 
    `${distributorUsername}/generations/${stage.toLowerCase()}`);
  }
}
