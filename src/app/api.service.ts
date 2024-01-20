import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {IUser} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _url = 'http://localhost:3000'

  constructor(private http: HttpClient, private auth: AuthService) { }

  private url(resource: string) {
    return `${this._url}/${resource}`
  }

  private headers() {
    return {
      'Authorization': "Bearer " + this.auth.token
    }
  }

  getUser() {
    return this.http.get<IUser>(this.url('user'), {
      headers: this.headers()
    })
  }

}
