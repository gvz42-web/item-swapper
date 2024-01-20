import { Component } from '@angular/core';
import {SwapService} from "../../../swap.service";
import {KeyboardComponent} from "./keyboard/keyboard.component";
import {NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-swap',
  standalone: true,
  imports: [
    KeyboardComponent,
    NgForOf,
    ButtonModule
  ],
  templateUrl: './swap.component.html',
  styleUrl: './swap.component.sass'
})
export class SwapComponent {
  code!: string
  inputCode = ['', '', '', '']
  inputState = 0

  constructor(private swap: SwapService, private router: Router) {
    this.getCode()
  }

  getCode() {
    this.swap.getCode().subscribe((data) => this.code = data.code)
  }

  input(event: { item: string }) {
    if (event.item === 'clear') {
      if (this.inputState > 0) {
        this.inputState--
        this.inputCode[this.inputState] = ''
      }

    } else if (event.item === 'start') {
      this.connectToUser()
    } else {
      if (this.inputState < 4) {
        this.inputCode[this.inputState] = event.item
        this.inputState++
      }
    }
  }

  exit() {
    this.router.navigate(['/panel'])
  }

  connectToUser() {
    if (this.inputCode.length === 4) {
      this.swap.connectToUser(this.code, this.inputCode.join(""))
    }
  }

  hello() {
    this.swap.hello()
  }
}
