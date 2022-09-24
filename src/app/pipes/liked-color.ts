import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likedColor'
})
export class LikedColor implements PipeTransform {

  private readonly likedColor = '#f44336'
  private readonly unlikedColor = '#757575'

  transform(value?: boolean, ...args: unknown[]): unknown {
    return value ? this.likedColor: this.unlikedColor;
  }

}
