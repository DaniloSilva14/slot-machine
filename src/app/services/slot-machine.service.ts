import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/Account';
import { Spinner } from '../models/Spinner';

@Injectable({
  providedIn: 'root'
})
export class SlotMachineService {

  constructor(
    private http: HttpClient
  ) { }

  getPoints() {
    return this.http.get<Account>('http://localhost:3000/account')
  }

  spin(selector: number) {
    return this.http.get<Spinner>(`http://localhost:3000/spinner-${selector}`)
  }
}
