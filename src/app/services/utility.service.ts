import { ConstantsService } from './constants.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private constantsService: ConstantsService, private http: HttpClient) {
  }

  authenticateDistributor(username: string, password: string): Observable<any> {
    return this.http.post(`${this.constantsService.DISTRIBUTORS_URL}/auth`, {
      username: username,
      password: password
    });
  }

  getDistributorLevels(): Observable<any> {
    return this.http.get(`${this.constantsService.DISTRIBUTOR_STAGES_URL}`);
  }
}
