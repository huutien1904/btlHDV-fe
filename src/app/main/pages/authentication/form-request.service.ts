import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class FormRequestService {
  constructor(private _httpClient: HttpClient) {}


  getkinhdoVido(city): Observable<any> {
    console.log("check");
    return this._httpClient.get<any>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=8e4352972abe8bd8c4f7617a5ad35876&lang=vi`
    );
  }
  getDetailWeather(city, id,day): Observable<any> {
    console.log("check");
    return this._httpClient.get<any>(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${id}&units=metric&lang=vi&cnt=${day}`
    );
  }

  sendInformationForTele(information:string,token: any): Observable<any> {
    return this._httpClient.get<any>(
      `https://api.telegram.org/bot5266462345:AAEVJbKywp7k8WTph33R6LE9Q_l4YpjMiFo/sendMessage?chat_id=-1001598164577&text=${information}`
    );
  }
  login(body): Observable<any> {
    console.log("check");
    return this._httpClient.post<any>(
      `http://localhost:3000/login`,body
    );
  }

  register(body): Observable<any> {
    return this._httpClient.post<any>(
      `http://localhost:3000/register`,body
    );
  }

  getAllUser (){
    return this._httpClient.get<any>(
      `http://localhost:3000/users`
    );
  }
  get(body): Observable<any> {
    return this._httpClient.post('http://localhost:3000/login',body)
  }
}
