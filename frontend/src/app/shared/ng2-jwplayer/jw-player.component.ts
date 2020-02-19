import { Component, EventEmitter, Input, Output, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { environment } from 'src/environments/environment';

declare var jwplayer: any;

@Component({
  selector: "jw-player",
  templateUrl: "./jw-player.component.html",
  styleUrls: ["./jw-player.component.scss"],
})

export class JwPlayerComponent implements AfterViewInit {

  constructor(private _elementRef: ElementRef) { }

  guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  public uniqueId: string = this.guid();
  public events: Array<string> = ['ready', 'play', 'pause', 'complete', 'seek', 'error', 'playlistItem', 'time', 'firstFrame'];

  @Input() public title: string;
  @Input() public file: string;
  @Input() public height: string;
  @Input() public width: string;
  @Output() public playerEvent: EventEmitter<any> = new EventEmitter();

  private _playerInstance: any = null;

  public handleEventsFor = (player: any) => {
    this.events.forEach((type) => {
      this.playerInstance
        .on(type, function(event) {
          this.playerEvent.emit(
            {
              playerId: this.uniqueId,
              event: event,
              type: type,
              playerInstance: this.playerInstance
            }
          );
        });
    })
  }

  public get playerInstance(): any {
    this._playerInstance = this._playerInstance || jwplayer(this._elementRef.nativeElement);
    return this._playerInstance;
  }

  ngAfterViewInit() {
    this.playerInstance.setup({
      file: `${environment.apiUrl}/${this.file}` ,
      height: this.height,
      width: this.width
    });
    this.handleEventsFor(this.playerInstance);


  }

  public seek = (options: { duration: number }) => {
    this.playerInstance.seek(options.duration);
  };



}
