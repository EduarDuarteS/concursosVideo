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

  href;
  urlUnica;
  concurso;

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
    this.href = this.router.url;
    console.log(this.router.url);
    console.log(this.href.split('/').pop());
    this.urlUnica = '/'+this.href.split('/').pop();

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
  }

}
