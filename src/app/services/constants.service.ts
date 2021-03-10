import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  SERVER_URL = "http://localhost:4700/api";
  DISTRIBUTORS_URL = `${this.SERVER_URL}/distributors`;
  DISTRIBUTOR_STAGES_URL = `${this.SERVER_URL}/distributorlevels`;

  constructor() { }
}
