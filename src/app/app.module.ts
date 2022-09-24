import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {AniListHttpClientService} from "./services/ani-list-http-client.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GraphQLModule} from './graphql/graphql.module';
import {LoginComponent} from './components/login/login.component';
import {CharacterOptionComponent} from "./components/character-option/character-option.component";
import {GameSettingsComponent} from "./components/game-settings/game-settings.component";
import {ChipsGenreComponent} from "./components/chips-genre/chips-genre.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {YearSelectionComponent} from "./components/year-selection/year-selection.component";
import {StatusSelectionComponent} from './components/status-selection/status-selection.component';
import {FuzzyDatePipe} from './pipes/fuzzy-date.pipe';
import {
  CharacterDescriptionCardComponent
} from './components/character-description-card/character-description-card.component';
import {GameComponent} from './components/character/game.component';
import {NameSelectionComponent} from './components/name-selection/name-selection.component';
import {NgxEnvModule} from "@ngx-env/core";
import {GenderSelectionComponent} from './components/gender-selection/gender-selection.component';
import {GenderInfoDialogComponent} from "./components/gender-selection/gender-info-dialog/gender-info-dialog.component";
import {HotToastModule} from '@ngneat/hot-toast';
import {ErrorInterceptor} from "./services/http-interceptor.service";
import {LikedColor} from './pipes/liked-color';
import {MaterialModule} from "./modules/material.module";

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
    GenderInfoDialogComponent,
    LikedColor
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    GraphQLModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEnvModule,
    HotToastModule.forRoot({
      position: "top-right"
    }),
    MaterialModule
  ],
  providers: [AniListHttpClientService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
