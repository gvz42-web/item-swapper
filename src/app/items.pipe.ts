import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'items',
  standalone: true
})
export class ItemsPipe implements PipeTransform {

  transform(value: string[]): { item: string, n: number }[] {
    const items: any = []
    for (let item of value) {
      const inResult = items.find((el: any) => el.item === item)
      if(!inResult) {
        items.push({
          item,
          n: 1
        })
      } else {
        inResult.n++
      }
    }
    return items;
  }

}
