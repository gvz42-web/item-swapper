import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass'
})
export class AuthComponent {
  public loginForm: FormGroup = new FormGroup({
    nickname: new FormControl(''),
    password: new FormControl('')
  })

  public registrationForm: FormGroup = new FormGroup({
    nickname: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  })

  public isLogin = true
  public error: string | undefined

  constructor(private auth: AuthService, private router: Router) {
  }

  toggle() {
    this.isLogin = !this.isLogin
    this.error = ''
    this.loginForm.reset()
    this.registrationForm.reset()
  }

  login() {
    this.auth.login(this.loginForm.controls['nickname'].value, this.loginForm.controls['password'].value)
      .subscribe({
        next: () => this.router.navigate(['panel']),
        error: error => this.error = error.error.message
      })
  }

  register() {
    if ( this.registrationForm.controls['password'].value ===  this.registrationForm.controls['repeatPassword'].value ) {
      this.auth.register(this.registrationForm.controls['nickname'].value, this.registrationForm.controls['password'].value)
        .subscribe({
        next: () => this.isLogin = true,
        error: error => this.error = error.error.message
      })
    } else {
      this.error = 'Passwords do not match'
    }

  }
}
