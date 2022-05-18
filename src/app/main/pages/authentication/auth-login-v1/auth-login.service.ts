import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private _httpClient: HttpClient) {}

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
}
