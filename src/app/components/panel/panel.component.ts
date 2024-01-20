import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {IUser} from "../../../types/User";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ItemsListComponent} from "./items-list/items-list.component";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    ItemsListComponent,
    NgIf
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.sass'
})
export class PanelComponent {
  public user!: IUser
  public pending: boolean;

  constructor(private api: ApiService) {
    this.pending = true
    this.api.getUser()
      .subscribe((user) => {
        this.user = user
        this.pending = false
      })
  }
}
