import { Component, OnInit } from '@angular/core';
import { YoutubePlayerService } from 'src/app/services/youtube-player.service';

@Component({
  selector: 'app-youtube-player',
  template: '<youtube-player></youtube-player>',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit {

  constructor(private YoutubePlayerService: YoutubePlayerService){}

  public videoId = ""
  ngOnInit() {
    this.YoutubePlayerService.videoId$.subscribe(result => this.videoId = result)
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}
