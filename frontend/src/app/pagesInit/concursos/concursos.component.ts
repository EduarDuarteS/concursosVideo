import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { URLUnicaService } from "../../services/urlUnica.service";
import { DatePipe, DOCUMENT  } from "@angular/common";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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


  public href: string = "";
  public concurso: any;

  // Datos de video
  yt_iframe_html: any;
  vimeo_iframe_html: any;
  dm_iframe_html: any;

  youtubeUrl = "https://www.youtube.com/watch?v=gVsEm_QRWiQ&list=RDgVsEm_QRWiQ&start_radio=1";

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
  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);

    this.urlUnicaService.getConcurso(this.router.url)
      .subscribe(
        result => {
          this.concurso = result;
          console.log(result);
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
