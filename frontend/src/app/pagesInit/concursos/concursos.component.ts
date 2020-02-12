import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-concursos',
  templateUrl: './concursos.component.html',
  styleUrls: ['./concursos.component.css']
})
export class ConcursosComponent implements OnInit {

  yt_iframe_html: any;
  vimeo_iframe_html: any;
  dm_iframe_html: any;

  youtubeUrl = "https://www.youtube.com/watch?v=gVsEm_QRWiQ&list=RDgVsEm_QRWiQ&start_radio=1";


  constructor(
    private embedService: EmbedVideoService
  ) {
    this.yt_iframe_html = this.embedService.embed(this.youtubeUrl);
  }
  ngOnInit() {
  }

}
