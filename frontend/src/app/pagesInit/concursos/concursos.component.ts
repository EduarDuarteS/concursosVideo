import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { URLUnicaService } from "../../services/urlUnica.service";

@Component({
  selector: 'app-concursos',
  templateUrl: './concursos.component.html',
  styleUrls: ['./concursos.component.css']
})
export class ConcursosComponent implements OnInit {

  public href: string = "";
  public concurso: any;

  yt_iframe_html: any;
  vimeo_iframe_html: any;
  dm_iframe_html: any;

  youtubeUrl = "https://www.youtube.com/watch?v=gVsEm_QRWiQ&list=RDgVsEm_QRWiQ&start_radio=1";


  constructor(
    private router: Router,
    private embedService: EmbedVideoService,
    private urlUnicaService: URLUnicaService
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
