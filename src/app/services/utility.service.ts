import { ConstantsService } from './constants.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  appName: string;
  appTitleEnd: string = "Ultimate Life Global";
  adminAppTitleEnd: string = "Ultimate Life Global Admin";

  unknownErrorMessage: string = "Unknown error. Please try again.";
  connectionErrorMessage: string = "Check your connection and try again.";
  unexpectedErrorMessage: string = "Unexpected error. Please try again later.";

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
