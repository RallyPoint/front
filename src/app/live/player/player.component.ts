import {ElementRef, Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
declare var p2pml: any;
declare var shaka: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit {

  @ViewChild('playerEl', {read: ElementRef}) playerEl: ElementRef;

  @Input('channel')
  public channel: string;

  constructor() {
  }

  onBytesDownloaded(method, size) {
    console.log(method);
  }
  onBytesUploaded(method, size) {
    console.log(method);
  }
  ngAfterViewInit(): void {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported() && p2pml.shaka.Engine.isSupported()) {
      const engine = new p2pml.shaka.Engine({
        loader : {
          trackerAnnounce : ['wss://tracker.openwebtorrent.com']
        }
      });
      engine.on(p2pml.core.Events.PieceBytesDownloaded, this.onBytesDownloaded.bind(this));

      engine.on(p2pml.core.Events.PieceBytesUploaded, this.onBytesUploaded.bind(this));
      const player = new shaka.Player(this.playerEl.nativeElement);
      player.addEventListener('error', (error) => { console.error('Error code', error.detail.code, 'object', error.detail); });

      (window as any).shaka = shaka;

      engine.initShakaPlayer(player);

      player.load(environment.liveUrl + '/live/' + this.channel + '.m3u8').then(()=>{
        console.log("======>");
        this.playerEl.nativeElement.play();
      }).catch(
        (error) => { console.error('Error code', error.code, 'object', error); }
      );
    } else {
      document.write('Not supported :(');
    }
  }

}
