import { Component, OnInit } from '@angular/core';
import { YoutubeApiV3Service } from 'src/app/services/youtube-api-v3.service';

@Component({
  selector: 'app-playlist-stats',
  templateUrl: './playlist-stats.component.html',
  styleUrls: ['./playlist-stats.component.css'],
})
export class PlaylistStatsComponent implements OnInit {
  channelId?: string;
  channelURL?: string;
  channelTitle?: string;
  playlists?: any;
  playlistTitles: string[] = [];
  inputString?: string;
  result?: string;
  selectedItem?: any;
  playListItems?: any;

  constructor(private YoutubeApiV3Service: YoutubeApiV3Service) {}
  ngOnInit(): void {}

  getPlaylists(): void {
    this.playlists = undefined;
    this.playlistTitles = [];
    let lastIndexA;
    let lastIndexB;
    if (this.inputString) {
      //Fall Video bereits aus Playlist
      if (this.inputString.includes('&list=')) {
        lastIndexA = this.inputString.lastIndexOf('watch?v=');
        lastIndexB = this.inputString.lastIndexOf('&list=');
      }
      if (!this.inputString.includes('&list=')) {
        //Fall Video + Channel
        lastIndexA = this.inputString.lastIndexOf('watch?v=');
        lastIndexB = this.inputString.lastIndexOf('&ab_channel=');
      }

      if (lastIndexA && lastIndexB && lastIndexA >= 0 && lastIndexB >= 0) {
        this.result = this.inputString.substring(lastIndexA + 8, lastIndexB);
      } else {
        //Fall Video ohne Channel
        this.result = this.getvideoIDforNoChannelInUrl(this.inputString);
      }
      this.YoutubeApiV3Service.getVideoInfo(this.result).subscribe(
        (response) => {
          if (response.items.length > 0) {
            this.channelId = response.items[0].snippet.channelId;
            console.log('channelID: ' + this.channelId);
            if (this.channelId) {
              this.YoutubeApiV3Service.getPlaylistsForChannel(
                this.channelId
              ).subscribe(
                (response) => {
                  if (response.items.length > 0) {
                    this.playlists = response;
                    response.items.forEach((element: any) =>
                      this.playlistTitles.push(element.snippet.title)
                    );
                    this.channelTitle = response.items[0].snippet.channelTitle;
                    console.log(
                      'Playlists für ' + this.channelTitle + ' gefunden'
                    );
                    this.YoutubeApiV3Service.getPlaylistItems(
                      'PLwX7q14hURZnVusI2kWKGJppipgpGpFDs'
                    ).subscribe();
                  } else {
                    console.error('No Playlists found.');
                  }
                },
                (error) => {
                  console.error('Error:', error);
                }
              );
            }
          } else {
            console.error('Video not found.');
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    console.log(this.playlistTitles);
  }

  getvideoIDforNoChannelInUrl(input: string): string {
    const parts = input.split('watch?v=');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    } else {
      return input;
    }
  }

  selectItem(item: string): void {
    this.playListItems = []
    this.selectedItem = item;
    console.log(this.selectedItem);
    let entryID = this.playlists.items.find(
      (item: any) => item.snippet.title === this.selectedItem
    ).id;
    this.YoutubeApiV3Service.getPlaylistItems(entryID).subscribe((response) => {

      response.items.forEach((element: any) =>
      this.playListItems.push(element.snippet.title)
    );
      //this.playListItems = response;
      console.log(response)
      console.log(this.playListItems.items);
    });
  }
}
