import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ImageModule} from "primeng/image";
import {BadgeModule} from "primeng/badge";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageModule,
    BadgeModule,
    NgIf
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.sass'
})
export class ItemComponent {

  @Input() item!: string
  @Input() n!: number

  constructor(private BadgeModule: BadgeModule) {
  }
}
