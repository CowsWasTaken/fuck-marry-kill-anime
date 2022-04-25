import {Pipe, PipeTransform} from '@angular/core';
import {FuzzyDate} from "../../models/DTO/FuzzyDate";

@Pipe({
  name: 'fuzzyDate'
})
export class FuzzyDatePipe implements PipeTransform {
  private months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

  transform(value: FuzzyDate): string {
    if (value.day && value.month) {
      return `${this.months[value.month - 1]} ${value.day}`
    } else {
      return '\'n/a\''
    }
  }

}
