import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-playlist-stats',
  templateUrl: './playlist-stats.component.html',
  styleUrls: ['./playlist-stats.component.css']
})
export class PlaylistStatsComponent implements OnInit {
  public idk = {
    "kind": "youtube#playlistListResponse",
    "etag": "DQvPKnZFcn7-Vg_TUTM6BMd--LQ",
    "pageInfo": {
      "totalResults": 3,
      "resultsPerPage": 5
    },
    "items": [
      {
        "kind": "youtube#playlist",
        "etag": "qX_ElmKwNlxxE35FsSjvlh5P3SA",
        "id": "PLKjaZR4bbIrd5hm1JLO4Ylbod-Ag58gr3",
        "snippet": {
          "publishedAt": "2022-09-29T15:02:59Z",
          "channelId": "UCoiEImZW54Db_0gY-DYN9TQ",
          "title": "test",
          "description": "",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/pQmgfb9Pfgs/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/pQmgfb9Pfgs/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/pQmgfb9Pfgs/hqdefault.jpg",
              "width": 480,
              "height": 360
            },
            "standard": {
              "url": "https://i.ytimg.com/vi/pQmgfb9Pfgs/sddefault.jpg",
              "width": 640,
              "height": 480
            },
            "maxres": {
              "url": "https://i.ytimg.com/vi/pQmgfb9Pfgs/maxresdefault.jpg",
              "width": 1280,
              "height": 720
            }
          },
          "channelTitle": "Montage Parodiez",
          "localized": {
            "title": "test",
            "description": ""
          }
        },
        "contentDetails": {
          "itemCount": 2
        }
      },
      {
        "kind": "youtube#playlist",
        "etag": "udlxLx9ReALg7ZZhYwUUUar5sCg",
        "id": "PLKjaZR4bbIrfFWzs76YA4Eofe-GK-nP51",
        "snippet": {
          "publishedAt": "2015-08-05T16:21:55Z",
          "channelId": "UCoiEImZW54Db_0gY-DYN9TQ",
          "title": "9uziuoz",
          "description": "",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/Nlk4MuFCTgc/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/Nlk4MuFCTgc/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/Nlk4MuFCTgc/hqdefault.jpg",
              "width": 480,
              "height": 360
            },
            "standard": {
              "url": "https://i.ytimg.com/vi/Nlk4MuFCTgc/sddefault.jpg",
              "width": 640,
              "height": 480
            },
            "maxres": {
              "url": "https://i.ytimg.com/vi/Nlk4MuFCTgc/maxresdefault.jpg",
              "width": 1280,
              "height": 720
            }
          },
          "channelTitle": "Montage Parodiez",
          "localized": {
            "title": "9uziuoz",
            "description": ""
          }
        },
        "contentDetails": {
          "itemCount": 348
        }
      },
      {
        "kind": "youtube#playlist",
        "etag": "wMupR-6FIRyW8xsNU1-hbugh3jQ",
        "id": "PLKjaZR4bbIrdaaYswZJJMXTxitt8OpRdq",
        "snippet": {
          "publishedAt": "2014-03-15T23:44:12Z",
          "channelId": "UCoiEImZW54Db_0gY-DYN9TQ",
          "title": "Daft Punk",
          "description": "",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/hqdefault.jpg",
              "width": 480,
              "height": 360
            },
            "standard": {
              "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/sddefault.jpg",
              "width": 640,
              "height": 480
            },
            "maxres": {
              "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/maxresdefault.jpg",
              "width": 1280,
              "height": 720
            }
          },
          "channelTitle": "Montage Parodiez",
          "localized": {
            "title": "Daft Punk",
            "description": ""
          }
        },
        "contentDetails": {
          "itemCount": 6
        }
      }
    ]
  }
  
  constructor(private ApiCallsService : ApiCallsService) {
  }
  ngOnInit(): void {
    
  }

  channelURL: string = '';

 async clickme() {
    this.spliceChannel(this.channelURL);
    
    this.ApiCallsService.apiCall().subscribe(response => {this.idk = response; this.helpMe()} );

 }

 helpMe() {
  let playListItems = this.idk.items;
  console.log(playListItems)
  let names = [""];
  playListItems.forEach(element => {
    names.push(element.snippet.title)
  });
  names.shift();
  names.forEach(element => {
    console.log(element)
  });
}

 spliceChannel(str:string){
  return str.substring(str.indexOf('channel') + ('channel').length + 1 , str.length);

  
 }

}
