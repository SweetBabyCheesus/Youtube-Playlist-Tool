import { Component, OnInit } from '@angular/core';
import { YoutubeApiV3Service } from 'src/app/services/youtube-api-v3.service';
import { YoutubePlayerService } from 'src/app/services/youtube-player.service';

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
  selectedPlaylist?: any;
  selectedVideo?: GoogleApiYouTubePlaylistItemResource;
  playListItems: GoogleApiYouTubePlaylistItemResource[] = [];
  filteredplayListItems: GoogleApiYouTubePlaylistItemResource[] = [];
  sortedObject: GoogleApiYouTubePlaylistItemResource[] = [];
  sortedWords: any;
  filterWord: string = '';

  constructor(
    private YoutubeApiV3Service: YoutubeApiV3Service,
    private YoutubePlayerService: YoutubePlayerService
  ) {}
  ngOnInit(): void {}

  getPlaylists(): void {
    this.playlists = undefined;
    this.playlistTitles = [];
    let lastIndexA;
    let lastIndexB;
    if (this.inputString) {
      //Fall: Video bereits aus Playlist
      if (this.inputString.includes('&list=')) {
        console.log("da")
        lastIndexA = this.inputString.lastIndexOf('watch?v=');
        lastIndexB = this.inputString.lastIndexOf('&list=');
      }
      //Fall: Video mit timestamp
      if (this.inputString.includes('&t=')) {
        let temp = this.inputString.split("&t=");
        this.inputString = temp[0];
        lastIndexA = this.inputString.lastIndexOf('watch?v=');
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

  getvideoIDforNoChannelInUrl(input: string): string {
    const parts = input.split('watch?v=');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    } else {
      return input;
    }
  }

  selectPlaylist(item: string, nextPageToken?: string): void {
    if (this.selectedPlaylist !== item) this.playListItems = [];
    this.selectedPlaylist = item;
    let entryID = this.playlists.items.find(
      (item: any) => item.snippet.title === this.selectedPlaylist.snippet.title
    ).id;
    this.YoutubeApiV3Service.getPlaylistItems(entryID, nextPageToken).subscribe(
      (response) => {
        response.items.forEach((element: any) =>
          this.playListItems.push(element)
        );
        if (response.nextPageToken)
          this.selectPlaylist(this.selectedPlaylist, response.nextPageToken);
        else {
          //fertig
          this.countHotWords();
        }
      }
    );
  }

  selectVideo(video: GoogleApiYouTubePlaylistItemResource): void {
    this.selectedVideo = video;
  }

  countHotWords() {
    let wordArray: string[] = [];
    let wordObject: any = {};
    this.playListItems.forEach((item) => {
      let tempString = item.snippet.title.split(' ');
      tempString.forEach((word) =>
        wordArray.push(word.charAt(0).toUpperCase() + word.slice(1))
      );
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
      return item
        .toString()
        .replace(new RegExp(',', 'g'), ' : ')
        .replace(/ /g, '\xa0');
    });
  }

  startVideoPlayer(videoId: string) {
    this.YoutubePlayerService.setVideoId(videoId);
  }

  reload() {
    window.location.reload();
  }

  selectWord(filterWord: any) {
    if (this.filterWord === filterWord) {
      this.filterWord = '';
    } else {
      this.filterWord = filterWord;
      this.filterPlaylist(filterWord);
    }
  }

  filterPlaylist(filterExpr: string){
    console.log(filterExpr)
    let afilterWord = filterExpr.split(":");
    this.filteredplayListItems = this.playListItems.filter(elem => elem.snippet.title.includes(afilterWord[0].slice(0 ,-1)))
  }
}
