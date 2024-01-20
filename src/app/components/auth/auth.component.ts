import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass'
})
export class AuthComponent {
  public loginForm: FormGroup = new FormGroup({
    nickname: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private auth: AuthService) {
  }

  login() {
    this.auth.login(this.loginForm.controls['nickname'].value, this.loginForm.controls['password'].value)
  }
}
