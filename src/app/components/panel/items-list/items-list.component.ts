import {Component, Input} from '@angular/core';
import {ItemComponent} from "./item/item.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ItemsPipe} from "../../../items.pipe";

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
    ItemsPipe,
    AsyncPipe
  ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.sass',
})
export class ItemsListComponent {
  @Input() items!: string[];
}
