import {ElementRef, Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
declare var p2pml: any;
declare var Clappr: any;

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
    if (p2pml.hlsjs.Engine.isSupported()) {
      const engine = new p2pml.hlsjs.Engine({
        loader: {
          trackerAnnounce: ['wss://tracker.openwebtorrent.com']
        }
      });
      engine.on(p2pml.core.Events.PieceBytesDownloaded, this.onBytesDownloaded.bind(this));

      engine.on(p2pml.core.Events.PieceBytesUploaded, this.onBytesUploaded.bind(this));


      const setup = {
        parentId: '#video',
        plugins: [],
        source: 'https://stats.rallypoint.tech/live/' + this.channel + '.m3u8',
        width: '100%',
        height: '100%',
        muted: true,
        mute: true,
        autoPlay: true,
        playback: {
          playInline: true,
          liveSyncDurationCount: 7,
          loader: engine.createLoaderClass()
        }
      };
      const outer = document.createElement('div');
      outer.className = 'embed-responsive embed-responsive-16by9';
      const video = document.createElement('div');
      video.id = 'video';
      video.className = 'embed-responsive-item';
      outer.appendChild(video);
      this.playerEl.nativeElement.appendChild(outer);

      const player = new Clappr.Player(setup);
      /*
            const player = new shaka.Player(this.playerEl.nativeElement);
            player.addEventListener('error', (error) => { console.error('Error code', error.detail.code, 'object', error.detail); });

            (window as any).shaka = shaka;

            engine.initShakaPlayer(player);

            player.load('https://stats.rallypoint.tech/live/' + this.channel + '.m3u8').then(() => {
              console.log('======>');
              this.playerEl.nativeElement.play();
            }).catch(
              (error) => { console.error('Error code', error.code, 'object', error); }
            );
          } else {
            document.write('Not supported :(');
          }

       */
    }
  }

}
