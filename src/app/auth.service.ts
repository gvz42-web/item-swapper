import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | undefined
  public error: string | undefined

  constructor(private api: ApiService, private router: Router, private messageService: MessageService) {
    this.token = localStorage.getItem('token') || undefined
  }

  isLoggedIn() {
    // return !!this.token
    return false
  }

  login(nickname: string, password: string) {
    this.api.login(nickname, password).subscribe((data: {token: string}) => {
      if (data && data.token) {
        localStorage.setItem('token', data.token)
        // this.router.navigate()
      }
    },
    (error) => {
      console.log(error)
      // this.messageService.add({severity: 'error', summary: 'Login failed', detail: error.error.message, life: 3000})
    })
  }
}
