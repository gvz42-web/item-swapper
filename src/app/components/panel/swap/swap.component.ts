import { Component } from '@angular/core';
import {SwapService} from "../../../swap.service";
import {KeyboardComponent} from "./keyboard/keyboard.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ItemsListComponent} from "../items-list/items-list.component";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-swap',
  standalone: true,
  imports: [
    KeyboardComponent,
    NgForOf,
    ButtonModule,
    NgIf,
    ProgressSpinnerModule,
    ItemsListComponent,
    AsyncPipe
  ],
  templateUrl: './swap.component.html',
  styleUrl: './swap.component.sass'
})
export class SwapComponent {
  code!: string
  inputCode = ['', '', '', '']
  inputState = 0
  allItems: string[] = []
  offerItems: string[] = []
  friendsItems: string[] = []

  status = ''

  constructor(public swap: SwapService, private router: Router, public api: ApiService) {
    this.getCode()
    this.swap.status$.subscribe((status) => {
      if (status === 'canceled') {
        this.router.navigate(['/panel'])
      } else {
        this.status = status
      }

    })
    this.api.getUser().subscribe((user) => {
      this.allItems = user.items
    })
    this.swap.friendItems$.subscribe((items) => {
      this.friendsItems = items
    })
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
    this.swap.disconnect()
    this.router.navigate(['/panel'])
  }

  connectToUser() {
    if (this.inputState === 4) {
      this.swap.connectToUser(this.code, this.inputCode.join(""))
    }
  }

  hello() {
    this.swap.hello()
  }

  toggleItem(item: string, target: 'send' | 'back' ) {
    if (target === 'send') {
      const i = this.allItems.indexOf(item)
      if (i !== -1) {
        this.allItems.splice(i, 1)
        this.allItems = [...this.allItems]
        this.offerItems = [...this.offerItems, item]
      }
    }
    if (target === 'back') {
      const i = this.offerItems.indexOf(item)
      if (i !== -1) {
        this.offerItems.splice(i, 1)
        this.offerItems = [...this.offerItems]
        this.allItems = [...this.allItems, item]
      }
    }
    this.swap.updateOffer(this.offerItems)
  }

}
