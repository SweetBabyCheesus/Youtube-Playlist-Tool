import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubePlayerService {
public videoId$: Observable<string>;
private videoIdSubject: Subject<string> = new Subject;
  constructor() { 
    this.videoId$ = this.videoIdSubject.asObservable();
  }

  setVideoId(videoId: string){
    this.videoIdSubject.next(videoId)
    console.log("start2")

  }
}
