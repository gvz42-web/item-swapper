import { Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemComponent} from "./item/item.component";
import {AsyncPipe, NgClass, NgForOf} from "@angular/common";
import {ItemsPipe} from "../../../items.pipe";

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
    ItemsPipe,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.sass'
})
export class ItemsListComponent {
  @Input() items!: string[];
  @Input() columnsCount: number = 2;
  @Output() choose = new EventEmitter<string>()

  chooseItem(item: string) {
    this.choose.emit(item)
  }
}
