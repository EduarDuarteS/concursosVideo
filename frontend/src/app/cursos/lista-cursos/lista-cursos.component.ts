import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe, DOCUMENT  } from "@angular/common";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursoService } from 'src/app/services/curso.service';
import { AuthService } from '../../services/usuario/auth.service';

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
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {

  eventos;
  user;
  animal: string;
  name: string;
  data;

  constructor(
    private eventoService: CursoService,
    public authService: AuthService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit() {
    this.user = this.authService.getDatos();
    console.log(this.user);

    this.eventoService.getEventos(this.user.dataAlumno.codigo_de_estudiante).subscribe(eventos => {
      console.log('data', eventos);
      this.eventos = eventos;
    });
  }

editarEvent(event, num){
  console.log("log: ",num);
  if(num==='01')
    event.id_user=num;
  else
    event.id_user='';
  this.openDialogEdit(event);
}

  delEvent(id_event) {
    console.log("id_event: ", id_event);

    this.eventoService.delEvent(this.user.dataAlumno.codigo_de_estudiante, id_event).subscribe(eventos => {
      console.log('data', eventos);
      this.eventos = eventos;
      this.refresh();
    });
  }

  //dialog popup
  openDialogEdit(event): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: event
    });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
          result.date_inicio="2020/03/07";
          result.date_fin="2020/04/07";
          result.id_categoria = +result.id_categoria;
          result.id_user = this.user.dataAlumno.codigo_de_estudiante
          console.log(result);

          this.eventoService.editEvent(result).subscribe(respuesta => {
            console.log('data', respuesta);
            this.refresh();
          });

        });
      }

  //dialog popup
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: {
        // nombre: this.nombre,
        // lugar: this.lugar,
        // direccion: this.direccion,
        // date_inicio: this.date_inicio,
        // date_fin: this.date_fin,
        // tipo_evento: this.tipo_evento,
        // id_categoria: this.id_categoria
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      result.date_inicio="2020/03/07";
      result.date_fin="2020/04/07";
      result.id_categoria = +result.id_categoria;
      result.id_user = this.user.dataAlumno.codigo_de_estudiante
      console.log(result);

      this.eventoService.createEvent(result).subscribe(respuesta => {
        console.log('data', respuesta);
        this.refresh();
      });
      // console.log("result:", result);
      // // json.stringify(result);
      // console.log("result.date_inicio: ", result.date_inicio);
      // const datepipe: DatePipe = new DatePipe();
      // var ddMMyyyy = result.date_inicio.transform(new Date(), "dd-MM-yyyy");
      // console.log(ddMMyyyy); //output - 14-02-2019
      // // var datePipe = new DatePipe(result.date_inicio);
      // console.log(result.date_inicio.getDay);
      // console.log(datepipe.transform(result.date_inicio, 'dd/MM/yyyy'));
      // console.log(datepipe.transform(new Date(), "MM-dd-yyyy"));
    });
  }


  refresh(): void {
    this._document.defaultView.location.reload();
}

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'create.event.dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
