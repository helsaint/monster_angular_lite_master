import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiChoroplethService {

  constructor(private http:HttpClient) { }

  getChoroplethData(){
    return this.http.get('http://127.0.0.1:8000/sofifa_general_api/sofifa_choropleth_api')
  }
}
