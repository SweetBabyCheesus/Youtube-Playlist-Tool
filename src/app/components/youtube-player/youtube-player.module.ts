import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { YoutubePlayerComponent } from './youtube-player.component';

@NgModule({
  imports: [YouTubePlayerModule],
  declarations: [YoutubePlayerComponent],
  exports: [YoutubePlayerComponent]
})
export class YoutubePlayerModule {

}