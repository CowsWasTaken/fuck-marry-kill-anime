import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {FilterComponent} from "../../interfaces/FilterComponent";
import {GenreCollection} from "../../constants/GenreCollection";

@Component({
  selector: 'app-chips-genre', templateUrl: './chips-genre.component.html', styleUrls: ['./chips-genre.component.css']
})
export class ChipsGenreComponent implements OnInit, FilterComponent {

  @Input() resetEvent?: Observable<void>
  @Output() genreEmitter = new EventEmitter<string[] | undefined>()
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genreCtrl = new FormControl();
  filteredGenres: Observable<string[]>;
  genres: Set<string> = new Set([]);
  allGenres: string[] = GenreCollection;

  genreInput: string = ''

  constructor() {
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(startWith(null), map((genre: string | null) => (genre ? this._filter(genre) : this.allGenres.slice())),);
  }

  setToDefault() {
    this.genres.clear()
    this.emitEmpty()
  }

  ngOnInit(): void {
    this.emitEmpty()
    this.resetEvent!.subscribe(() => {
      this.setToDefault()
    })
  }

  add(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    // checks if value is already in list or if input genre is a valid genre from the all genre list
    value = this.isGenreValid(value)

    // checks if value is already in list and not null
    if (value && !this.genres.has(value)) {
      this.genres.add(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.genreCtrl.setValue(null);
    this.emitChange()
  }

  remove(fruit: string): void {
    this.genres.delete(fruit);
    if (this.genres.size === 0) {
      this.emitEmpty()
    } else {
      this.emitChange()
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.add(event.option.viewValue);
    this.genreInput = '';
    this.genreCtrl.setValue(null);
    this.emitChange()
  }

  emitChange() {
    this.genreEmitter.emit(Array.from(this.genres))
  }

  emitEmpty() {
    this.genreEmitter.emit(undefined)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  private isGenreValid(input: string): string {
    for (const item of this.allGenres) {
      if (item.toLowerCase() === input.toLowerCase()) {
        return item
      }
    }
    return ''
  }
}
