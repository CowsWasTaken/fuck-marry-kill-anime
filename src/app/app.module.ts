import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {AniListHttpClientService} from "./services/ani-list-http-client.service";
import {HttpClientModule} from "@angular/common/http";
import { GraphQLModule } from './graphql.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [AniListHttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
