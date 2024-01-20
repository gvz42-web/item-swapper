import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token!: string
  public error: string | undefined
  private _url = 'http://localhost:3000/auth/'

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token')
    if (token) {
      this.token = token
    }
  }

  set token(value: string) {
    this._token = value
    localStorage.setItem('token', value)
  }

  get token() {
    return this._token
  }

  isLoggedIn() {
    return !!this.token
  }

  login(nickname: string, password: string) {
    const request = this.http.post<{token: string}>(this._url + 'login', {
      nickname,
      password
    })
    request.subscribe((data) => this.token = data.token)
    return request
  }

  register(nickname: string, password: string) {
    return this.http.post<{token: string}>(this._url + 'register', {
      nickname,
      password
    })
  }
}
