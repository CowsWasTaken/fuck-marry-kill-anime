import {Component, OnInit} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import { Genres } from '../constants/Genres';

@Component({
  selector: 'app-chips-genre',
  templateUrl: './chips-genre.component.html',
  styleUrls: ['./chips-genre.component.css']
})
export class ChipsGenreComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  genreCtrl = new FormControl();
  filteredGenres: Observable<string[]>;
  genres: string[] = [];
  allGenres: string[] = Genres;

  genreInput: string = ''

  constructor() {
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => (genre ? this._filter(genre) : this.allGenres.slice())),
    );
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.genres.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.genreCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.genres.indexOf(fruit);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.viewValue);
    this.genreInput= '';
    this.genreCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
