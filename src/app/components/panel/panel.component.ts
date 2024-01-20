import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {IUser} from "../../../types/User";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ItemsListComponent} from "./items-list/items-list.component";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    ItemsListComponent,
    NgIf,
    ButtonModule
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.sass'
})
export class PanelComponent {
  public user!: IUser
  public pending: boolean;

  constructor(private api: ApiService, private router: Router) {
    this.pending = true
    this.api.getUser()
      .subscribe((user) => {
        this.user = user
        this.pending = false
      })
  }

  swap() {
    this.router.navigate(['swap'])
  }
}
