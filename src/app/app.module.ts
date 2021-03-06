import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {AniListHttpClientService} from "./services/ani-list-http-client.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import { GameComponent } from './components/character/game.component';
import { NameSelectionComponent } from './components/name-selection/name-selection.component';
import {NgxEnvModule} from "@ngx-env/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { GenderSelectionComponent } from './components/gender-selection/gender-selection.component';
import {GenderInfoDialogComponent} from "./components/gender-selection/gender-info-dialog/gender-info-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import { HotToastModule } from '@ngneat/hot-toast';
import {ErrorInterceptor} from "./services/http-interceptor.service";

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
    GameComponent,
    NameSelectionComponent,
    GenderSelectionComponent,
    GenderInfoDialogComponent
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
    NgxEnvModule,
    MatProgressBarModule,
    MatDialogModule,
    HotToastModule.forRoot({
      position: "top-right"
    }),
  ],
  providers: [AniListHttpClientService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
