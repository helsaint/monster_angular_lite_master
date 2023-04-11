import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiBubblePlotEarningsService {

  constructor(private http:HttpClient) {}

  getBubblePlotEarnings(){
    return this.http.get('http://127.0.0.1:8000/sofifa_general_api/sofifa_bubble_plot_earnings_api');
  }

}
