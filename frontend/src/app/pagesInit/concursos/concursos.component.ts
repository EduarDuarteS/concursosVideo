import { Component, OnInit, AfterViewInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { URLUnicaService } from "../../services/urlUnica.service";
import { DatePipe, DOCUMENT } from "@angular/common";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var jwplayer: any;

export interface DialogData {
  nombre: string,
  lugar: string,
  direccion: string,
  date_inicio: DatePipe,
  date_fin: DatePipe,
  tipo_evento: string,
  id_categoria: number
}

@Component({
  selector: 'app-concursos',
  templateUrl: './concursos.component.html',
  styleUrls: ['./concursos.component.css']
})
export class ConcursosComponent implements OnInit {

  public loading: boolean = true;

  @ViewChild("player", { static: false }) video: ElementRef;
  public href: string = "";
  public concurso: any;

  // Datos de video
  yt_iframe_html: any;
  vimeo_iframe_html: any;
  dm_iframe_html: any;
  youtubeUrl = "https://www.youtube.com/watch?v=gVsEm_QRWiQ&list=RDgVsEm_QRWiQ&start_radio=1";

  //Datos child jw-playerId
  files = [
    { 'file': "http://172.24.42.42:8080/resources/upload/No%20me%20arrepiento.mp4" },
    { 'file': "http://172.24.42.42:8080/resources/upload/No%20me%20arrepiento.mp4" },
    { 'file': "http://172.24.42.42:8080/resources/upload/No%20me%20arrepiento.mp4" },
  ];
  file: string = 'http://172.24.42.42:8080/resources/upload/No%20me%20arrepiento.mp4';
  height: string = "420px";
  width: string = "680px";
  seek: string = "seek";

  // DATOS DE DIALOG
  eventos;
  user;
  animal: string;
  name: string;
  data;

  constructor(
    private router: Router,
    private embedService: EmbedVideoService,
    private urlUnicaService: URLUnicaService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.yt_iframe_html = this.embedService.embed(this.youtubeUrl);
  }
  ngAfterViewInit() {
    console.log('file: ', this.file);
    console.log(this.video.nativeElement.innerHTML);
    this.video.nativeElement.innerHTML = "DOM updated successfully!!!";

    // jwplayer
    const playerJw = jwplayer(this.video.nativeElement).setup({
      title: 'Player Test',
      playlist: {
        "title": "Driving USA",
        "description": "Beautiful sunset point of view shot along empty desert highway through Monument Valley, Arizona Utah",
        "kind": "Single Item",
        "playlist": [
          {
            "title": "Driving USA",
            "mediaid": "8L4m9FJB",
            "link": "https://cdn.jwplayer.com/previews/8L4m9FJB",
            "image": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=720",
            "images": [
              {
                "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=320",
                "width": 320,
                "type": "image/jpeg"
              },
              {
                "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=480",
                "width": 480,
                "type": "image/jpeg"
              },
              {
                "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=640",
                "width": 640,
                "type": "image/jpeg"
              },
              {
                "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=720",
                "width": 720,
                "type": "image/jpeg"
              }
            ],
            "duration": 30,
            "pubdate": 1495054284,
            "description": "Beautiful sunset point of view shot along empty desert highway through Monument Valley, Arizona Utah",
            "tags": "stock video",
            "sources": [
              {
                "file": "https://cdn.jwplayer.com/manifests/8L4m9FJB.mpd",
                "type": "application/dash+xml",
                "mediaTypes": [
                  "video/webm; codecs=\"vp9\""
                ]
              },
              {
                "file": "https://cdn.jwplayer.com/manifests/8L4m9FJB.m3u8",
                "type": "application/vnd.apple.mpegurl"
              },
              {
                "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-Zq6530MP.mp4",
                "type": "video/mp4",
                "height": 180,
                "width": 320,
                "label": "H.264 320px"
              },
              {
                "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-TNpruJId.mp4",
                "type": "video/mp4",
                "height": 270,
                "width": 480,
                "label": "H.264 480px"
              },
              {
                "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-cIp6U8lV.mp4",
                "type": "video/mp4",
                "height": 406,
                "width": 720,
                "label": "H.264 720px"
              },
              {
                "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-FctPAkow.mp4",
                "type": "video/mp4",
                "height": 720,
                "width": 1280,
                "label": "H.264 1280px"
              },
              {
                "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-8yQ1cYbs.mp4",
                "type": "video/mp4",
                "height": 1080,
                "width": 1920,
                "label": "H.264 1920px"
              }
            ],
            "tracks": [
              {
                "file": "https://cdn.jwplayer.com/strips/8L4m9FJB-120.vtt",
                "kind": "thumbnails"
              }
            ],
            "variations": {}
          }
        ],
        "feed_instance_id": "a00fc959-d0c2-4c4c-b520-cee2d78e8c2d"
      },
      width: 640,
      height: 360,
      aspectratio: '16:9',
      mute: false,
      autostart: true,
      primary: 'html5',
    });


  }
  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);

    this.urlUnicaService.getConcurso(this.router.url)
      .subscribe(
        result => {
          this.concurso = result;
          console.log(result);
          this.loading = false;

          if (!result) {
            this.router.navigate(['/err/err']);
          }
        },
        error => {
          console.log(error);
          this.router.navigate(['/err/err']);


        },
        () => {
          // this.router.navigate(['/admin/eventos']);
        }
      );



    // console.log(playerJw);
    console.log('message', this._document);
    console.log('message2', this.video);
    // console.log('aca', this.video.nativeElement.innerHTML);
  }


  //dialog popup
  openDialog(): void {
    const dialogRef = this.dialog.open(ChargeVDialogComponent, {
      width: '350px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      // this.concursoService.createEvent(result).subscribe(respuesta => {
      //   console.log('data', respuesta);
      //   this.refresh();
      // });

    });
  }


  refresh(): void {
    this._document.defaultView.location.reload();
  }


  private serverList: any = {
    "cdnServers": [
      {
        "title": "shrek-4",

        "sources": [
          // {
          //   "file": "https://media6.comwel.net/videos/GQlE6Rqd-AgylS15n.mp4",
          //   "label": "240"
          // },
          // {
          //   "file": "https://media6.comwel.net/videos/GQlE6Rqd-8LSW5F2t.mp4",
          //   "label": "360"
          // },
          // {
          //   "file": "https://media6.comwel.net/videos/GQlE6Rqd-PA9rXzRh.mp4",
          //   "label": "480"
          // }

          { "title": "Driving USA", "description": "Beautiful sunset point of view shot along empty desert highway through Monument Valley, Arizona Utah", "kind": "Single Item", "playlist": [{ "title": "Driving USA", "mediaid": "8L4m9FJB", "link": "https://cdn.jwplayer.com/previews/8L4m9FJB", "image": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=720", "images": [{ "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=320", "width": 320, "type": "image/jpeg" }, { "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=480", "width": 480, "type": "image/jpeg" }, { "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=640", "width": 640, "type": "image/jpeg" }, { "src": "https://cdn.jwplayer.com/v2/media/8L4m9FJB/poster.jpg?width=720", "width": 720, "type": "image/jpeg" }], "duration": 30, "pubdate": 1495054284, "description": "Beautiful sunset point of view shot along empty desert highway through Monument Valley, Arizona Utah", "tags": "stock video", "sources": [{ "file": "https://cdn.jwplayer.com/manifests/8L4m9FJB.mpd", "type": "application/dash+xml", "mediaTypes": ["video/webm; codecs=\"vp9\""] }, { "file": "https://cdn.jwplayer.com/manifests/8L4m9FJB.m3u8", "type": "application/vnd.apple.mpegurl" }, { "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-Zq6530MP.mp4", "type": "video/mp4", "height": 180, "width": 320, "label": "H.264 320px" }, { "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-TNpruJId.mp4", "type": "video/mp4", "height": 270, "width": 480, "label": "H.264 480px" }, { "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-cIp6U8lV.mp4", "type": "video/mp4", "height": 406, "width": 720, "label": "H.264 720px" }, { "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-FctPAkow.mp4", "type": "video/mp4", "height": 720, "width": 1280, "label": "H.264 1280px" }, { "file": "https://cdn.jwplayer.com/videos/8L4m9FJB-8yQ1cYbs.mp4", "type": "video/mp4", "height": 1080, "width": 1920, "label": "H.264 1920px" }], "tracks": [{ "file": "https://cdn.jwplayer.com/strips/8L4m9FJB-120.vtt", "kind": "thumbnails" }], "variations": {} }], "feed_instance_id": "a00fc959-d0c2-4c4c-b520-cee2d78e8c2d" }

        ]
      },

    ]
  };

}

// -----------------------------------
// Concursos Componet Dialogo       //
// -----------------------------------
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'subir.video.dialog.html',
})
export class ChargeVDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChargeVDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
