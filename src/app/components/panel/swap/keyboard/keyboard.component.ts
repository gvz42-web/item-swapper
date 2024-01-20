import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    NgForOf,
    ButtonModule
  ],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.sass'
})
export class KeyboardComponent {
  emoji = ["❤️", "🥝", "🍀", "🖤", "🌙", "⚡️", "🌍", "🕹️", "😂"]

  @Output() input = new EventEmitter<{item: string}>()

  key(item: string) {
    this.input.emit({item: item})
  }
}
