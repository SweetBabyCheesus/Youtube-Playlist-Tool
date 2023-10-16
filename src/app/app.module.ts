import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistStatsComponent } from './components/playlist-stats/playlist-stats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http';
import { YoutubePlayerModule } from './components/youtube-player/youtube-player.module'

@NgModule({
  declarations: [
    AppComponent,
    PlaylistStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    YoutubePlayerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
