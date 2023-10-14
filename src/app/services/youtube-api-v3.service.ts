import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiV3Service {
  private apiKey = 'AIzaSyBb1HJ4U_GtTuRFz2L0zc3Wck01bANpaOA';
  private apiUrlVideo = 'https://www.googleapis.com/youtube/v3/videos';
  private apiUrlChannel = 'https://www.googleapis.com/youtube/v3/playlists';
  private apiUrlPlaylist = 'https://www.googleapis.com/youtube/v3/playlistItems';

  constructor(private http: HttpClient) {}

  getVideoInfo(videoId: string): Observable<any> {
    const params = {
      key: this.apiKey,
      id: videoId,
      part: 'snippet',
    };
    return this.http.get(this.apiUrlVideo, { params });
  }

  getPlaylistsForChannel(channelID: string): Observable<any> {
    const params = {
      key: this.apiKey,
      channelId: channelID,
      part: 'snippet',
    };
    return this.http.get(this.apiUrlChannel, { params });
  }

  getPlaylistItems(playlistId: string, nextPageToken?: string): Observable<any> {
    const params = {
      key: this.apiKey,
      playlistId: playlistId,
      part: 'snippet',
      maxResults: '50',
      pageToken: ''
    };
    if (nextPageToken) params.pageToken = nextPageToken;

    return this.http.get(this.apiUrlPlaylist, { params });
  }
}
