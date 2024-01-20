import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  private url(resource: string) {
    return `${this._url}/${resource}`
  }

  login(nickname: string, password: string) {
    return this.http.post<{token: string}>(this.url('auth/login'), {
      nickname,
      password
    })
  }
}
