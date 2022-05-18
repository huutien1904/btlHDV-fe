import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormRequestService {
  constructor(private _httpClient: HttpClient) {}

  getDetailWeather(city, id): Observable<any> {
    console.log("check");
    return this._httpClient.get<any>(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}&units=metric`
    );
  }

  sendInformationForTele(information:string,token: any): Observable<any> {
    return this._httpClient.get<any>(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=-1001598164577&text=${information}`
    );
  }
}
