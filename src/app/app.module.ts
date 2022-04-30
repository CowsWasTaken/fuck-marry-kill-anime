import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {AniListHttpClientService} from "./services/ani-list-http-client.service";
import {HttpClientModule} from "@angular/common/http";
import { GraphQLModule } from './graphql/graphql.module';
import { LoginComponent } from './components/login/login.component';
import {CharacterOptionComponent} from "./components/character-option/character-option.component";
import {GameSettingsComponent} from "./components/game-settings/game-settings.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ChipsGenreComponent} from "./components/chips-genre/chips-genre.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {YearSelectionComponent} from "./components/year-selection/year-selection.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatTooltipModule} from "@angular/material/tooltip";
import { StatusSelectionComponent } from './components/status-selection/status-selection.component';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import { FuzzyDatePipe } from './pipes/fuzzy-date.pipe';
import { CharacterDescriptionCardComponent } from './components/character-description-card/character-description-card.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CharacterComponent } from './components/character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CharacterOptionComponent,
    GameSettingsComponent,
    ChipsGenreComponent,
    YearSelectionComponent,
    StatusSelectionComponent,
    FuzzyDatePipe,
    CharacterDescriptionCardComponent,
    CharacterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        GraphQLModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatTooltipModule,
        MatListModule,
        MatCheckboxModule,
        MatTabsModule,
        MatCardModule,
        MatProgressSpinnerModule,
    ],
  providers: [AniListHttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
