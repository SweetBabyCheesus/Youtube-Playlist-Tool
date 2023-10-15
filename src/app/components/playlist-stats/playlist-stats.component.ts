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
  playlistTitles: any[] = [];
  inputString?: string;
  result?: string;
  selectedItem?: any;
  playListItems: GoogleApiYouTubePlaylistItemResource[] = [];
  sortedObject: any;
  sortedWords: any;

  constructor(private YoutubeApiV3Service: YoutubeApiV3Service) {}
  ngOnInit(): void {}

  getPlaylists(): void {
    this.playlists = undefined;
    this.playlistTitles = [];
    let lastIndexA;
    let lastIndexB;
    if (this.inputString) {
      //Fall: Video bereits aus Playlist
      if (this.inputString.includes('&list=')) {
        lastIndexA = this.inputString.lastIndexOf('watch?v=');
        lastIndexB = this.inputString.lastIndexOf('&list=');
      }
      //Fall: Video mit timestamp
      if (this.inputString.includes('&t=')) {
        lastIndexA = this.inputString.lastIndexOf('watch?v=');
        lastIndexB = this.inputString.lastIndexOf('&t=');
      }
      if (!this.inputString.includes('&list=')) {
        //Fall: Video + Channel
        lastIndexA = this.inputString.lastIndexOf('watch?v=');
        lastIndexB = this.inputString.lastIndexOf('&ab_channel=');
      }

      if (lastIndexA && lastIndexB && lastIndexA >= 0 && lastIndexB >= 0) {
        this.result = this.inputString.substring(lastIndexA + 8, lastIndexB);
      } else {
        //Fall: Video ohne Channel
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
                      this.playlistTitles.push(element)
                    );
                    this.channelTitle = response.items[0].snippet.channelTitle;
                    console.log(
                      'Playlists für ' + this.channelTitle + ' gefunden'
                    );
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

  concatenatedUrl(a: any): string {
    let videoUrl = a.snippet.resourceId.videoId;
    return `https://www.youtube.com/watch?v=` + videoUrl;
  }

  getvideoIDforNoChannelInUrl(input: string): string {
    const parts = input.split('watch?v=');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    } else {
      return input;
    }
  }

  selectItem(item: string, nextPageToken?: string): void {
    if (this.selectedItem !== item) this.playListItems = [];
    this.selectedItem = item;
    let entryID = this.playlists.items.find(
      (item: any) => item.snippet.title === this.selectedItem.snippet.title
    ).id;
    this.YoutubeApiV3Service.getPlaylistItems(entryID, nextPageToken).subscribe(
      (response) => {
        response.items.forEach((element: any) =>
          this.playListItems.push(element)
        );
        if (response.nextPageToken)
          this.selectItem(this.selectedItem, response.nextPageToken);
        else {
          //fertig
          this.countHotWords();
        }
      }
    );
  }

  countHotWords() {
    let wordArray: string[] = [];
    let wordObject: any = {};
    this.playListItems.forEach((item) => {
      let tempString = item.snippet.title.split(' ');
      tempString.forEach((word) => wordArray.push(word.charAt(0).toUpperCase() + word.slice(1)));
    });
    wordArray.forEach((word) => {
      if (!wordObject[word]) {
        wordObject[word] = 1;
      } else {
        wordObject[word] = wordObject[word] + 1;
      }
    });

    let entries = Object.entries(wordObject);

    this.sortedWords = entries.sort((a: any, b: any) => b[1] - a[1]);

    this.sortedWords = this.sortedWords.map((item: any) => {
      return item.toString().replace(new RegExp(',', 'g'), ' : ');
    });
    console.log(this.sortedWords);
    console.log(wordObject);
    console.log(this.sortedObject);
  }
}
