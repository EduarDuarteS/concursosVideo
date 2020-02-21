import { Component, OnInit, AfterViewInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource  } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { URLUnicaService } from "../../services/urlUnica.service";
import { DatePipe, DOCUMENT } from "@angular/common";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
  public ip: string = `${environment.apiUrl}/`;
  public dataVideo: any;

  @ViewChild("player", { static: false }) video: ElementRef;
  public href: string = "";
  public concurso: any;

  //paginator
  displayedColumns = ['Videos'];
  // dataSource: any = new MatTableDataSource<any>();
  dataSource = new MatTableDataSource([]);
  sort;
  paginator;
  applyFilter;

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
      this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.paginator && this.sort) {
          this.applyFilter('');
      }
  }
  // Datos de video
  yt_iframe_html: any;
  vimeo_iframe_html: any;
  dm_iframe_html: any;
  youtubeUrl = "https://www.youtube.com/watch?v=gVsEm_QRWiQ&list=RDgVsEm_QRWiQ&start_radio=1";

  //Datos child jw-playerId
  // files = [
  //   { 'file': "http://172.24.42.42:8080/resources/upload/No%20me%20arrepiento.mp4" },
  //   { 'file': "http://172.24.42.42:8080/resources/upload/No%20me%20arrepiento.mp4" },
  // ];
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

    // Obtener VIDEOS
    this.urlUnicaService.getVideos(this.router.url, 0, 50)
      .subscribe(
        result => {
          // this.concurso = result;
          console.log("----------result: ", `${environment.apiUrl}`, result);
          this.dataVideo = result;
          this.dataSource = new MatTableDataSource<Element>(result);
          if (!result) {
          }
        },
        error => {
          console.log(error);
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
      console.log("result-dialog: ", result);

      // this.concursoService.createEvent(result).subscribe(respuesta => {
      //   console.log('data', respuesta);
      //   this.refresh();
      // });

    });
  }

  refresh(): void {
    this._document.defaultView.location.reload();
  }
  ngAfterViewInit() {
    console.log("paginator:---------",this.paginator, this._document.getElementsByTagName("MAT-PAGINATOR"));
    // this.dataSource.paginator = this._document.getElementsByTagName("MAT-PAGINATOR");
    // console.log('message', this.dataSource.paginator);
    this.dataSource.paginator = this.paginator;
  }
}



// -----------------------------------
// Concursos Componet Dialogo       //
// -----------------------------------
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'subir.video.dialog.html',
  styles: [`.modal__content,dialog-layout,mat-dialog-container,.mat-dialog-container,#cdk-overlay-0,.cdk-overlay-pane {
    z-index: 9999 !important;`]
})
export class ChargeVDialogComponent {

  uploadForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ChargeVDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    // this.uploadForm = new FormGroup({
    //   name: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   message: new FormControl()
    // });
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [''],
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      message: new FormControl()
    });
    console.log(this.uploadForm);
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      console.log(this.uploadForm);

    }
  }

  onSubmit(): void {
    let formData = new FormData();

    formData.append("name", this.uploadForm.get('name').value);
    formData.append("lastName", this.uploadForm.get('lastName').value);
    formData.append("email", this.uploadForm.get('email').value);
    formData.append("message", this.uploadForm.get('message').value);
    // formData.append("videoname", "PRUEBA");
    // formData.append("videoname", this.uploadForm.get('videoname').value);

    console.log("uploadForm: ", this.uploadForm);

    //capturar ext
    let ext: string = this.getFileExtension(this.uploadForm.value.profile.name);
    let nombre: string = this.uploadForm.value.profile.name;
    let nomSinExt: string = nombre.substr(0, (nombre.length - (ext.length + 1)));

    let newNom: string = nomSinExt + this.guid() + "." + ext;
    // console.log(this.uploadForm.get('profile'));
    // console.log(this.uploadForm.get('profile').value.name);
    // let mani: any =
    // this.uploadForm.get('profile').setValue({
    //   name: newNom,
    // });

    formData.append('video', this.uploadForm.get('profile').value);
    // .setValue(newNom)
    // mani.value.name = newNom;
    // console.log(this.uploadForm.get('profile'));
    // console.log(this.uploadForm.get('profile').value.name);


    // console.log("newNom: ", newNom);

    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }



    // console.log(formData.getAll());
    // console.log(this.uploadForm.get('name').value);
    // formData.append("name", this.form.get('name').value);
    console.log("formDATA:", formData);

    // this.httpClient.post<any>(`http://172.24.42.61:8082/${this.router.url}/upload`, formData).subscribe(
    this.httpClient.post<any>(`http://172.24.42.61:8082/colsanitas/upload`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    this.dialogRef.close();

  };

  getFileExtension(filename) {
    return filename.split('.').pop();
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

  onNoClick(): void {
    this.dialogRef.close();
  };

}
