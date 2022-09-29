import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient) { }

  //Http Client get method
public apiCall() {
  console.log(this.http.get
    ("https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2C%20id&key=AIzaSyBb1HJ4U_GtTuRFz2L0zc3Wck01bANpaOA&channelId=UCoiEImZW54Db_0gY-DYN9TQ")
    .pipe(map((response: any) => response)));
  return this.http.get
  ("https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2C%20id&key=AIzaSyBb1HJ4U_GtTuRFz2L0zc3Wck01bANpaOA&channelId=UCoiEImZW54Db_0gY-DYN9TQ")
  .pipe(map((response: any) => response));
}
}