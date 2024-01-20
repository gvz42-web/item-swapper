import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {ButtonModule} from "primeng/button";
import {ApiService} from "./api.service";
import {CardModule} from "primeng/card";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent{
  title = 'item-swapper';
  text = '';

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['panel'])
    } else {
      this.router.navigate(['auth'])
    }
  }

  login() {
    this.api.login('gvz', '123456')
      .subscribe((data) => this.text = JSON.stringify(data))
  }
}
