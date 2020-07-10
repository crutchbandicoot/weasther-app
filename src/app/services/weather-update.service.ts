import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherUpdateService {

  APIKey = 'b608e6fded6d8b11a5661dd0565cd21f';
  url: any = `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${this.APIKey}`;
  
  constructor(private http : HttpClient) { }

  getWeather(){
    return this.http.get(this.url);
  }
}
