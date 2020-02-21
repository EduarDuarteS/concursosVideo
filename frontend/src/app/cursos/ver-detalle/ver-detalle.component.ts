import { Component, OnInit, AfterViewInit, Inject, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { URLUnicaService } from "../../services/urlUnica.service";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


declare var jwplayer: any;


@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.css']
})
export class VerDetalleComponent implements OnInit {

  hreff;
  urlUnica;

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

  constructor(private router: Router,
    private urlUnicaService: URLUnicaService,
  ) { }

  ngOnInit() {
    this.hreff = this.router.url;
    console.log(this.router.url);
    console.log(this.hreff.split('/').pop());
    this.urlUnica = '/'+this.hreff.split('/').pop();

        this.urlUnicaService.getConcurso(this.urlUnica)
          .subscribe(
            result => {
              this.concurso = result;
              console.log(result);

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

          // Obtener VIDEOS
          this.urlUnicaService.getVideos(this.urlUnica, 0, 50)
            .subscribe(
              result => {
                // this.concurso = result;
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
  }

}
