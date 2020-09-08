import {
  ElementRef,
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Utils} from '../../share/utils';
import {ApiService} from '../../share/api.service';
import {isPlatformBrowser} from "@angular/common";
declare var p2pml: any;
declare var Clappr: any;
declare var ClapprGaEventsPlugin: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnDestroy {

  private static readonly STATS_INTERVAL_DELAY: number = 4000;

  @ViewChild('playerEl', {read: ElementRef}) playerEl: ElementRef;

  @Input('channel')
  public channel: string;

  @Input('muted')
  public muted: boolean = false;

  @Input('server')
  public server: string;

  @Input('file')
  public file: string;

  public nbViwer: number;

  public showShare: boolean = false;

  public currentUrl : string;

  @Input('title')
  public title: string;

  private statsInterval: any;
  private statsUid: number;

  private player: any;

  constructor(private readonly apiService: ApiService,
              @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)){
      this.currentUrl = window.location.href;
    }
  }

  onBytesDownloaded(method, size) {
  }
  onBytesUploaded(method, size) {
  }
  ngOnDestroy(): void {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }
    this.player.stop();
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

      let url = '';
      if (this.channel) {
        if (environment.name !== 'local') {
          url = Utils.GetRandomOfArray(environment.liveUrl) + '/' + this.server + '/' + this.channel + '.m3u8';
        } else {
          url = Utils.GetRandomOfArray(environment.liveUrl) + '/' + this.channel + '.m3u8';
        }
      } else if (this.file) {
        url = Utils.GetRandomOfArray(environment.vodUrl) + '/hls/' + this.file + '/master.m3u8';
      }

      const setup = {
        parentId: '#video',
        source: url,
        width: '100%',
        height: '100%',
        maxHeight: '500px',
        muted: true,
        mute: this.muted,
        autoPlay: true,
        playback: {
          playInline: true,
          liveSyncDurationCount: 7,
          loader: engine.createLoaderClass()
        },
        plugins: {
          core: [ClapprGaEventsPlugin],
        },
        gaEventsPlugin: {
          trackingId: 'UA-174160792-1',
          eventValueAuto: true,
          eventValueAsLive: true,
        }
      };
      const outer = document.createElement('div');
      outer.className = 'embed-responsive embed-responsive-16by9';
      const video = document.createElement('div');
      video.id = 'video';
      video.className = 'embed-responsive-item';
      outer.appendChild(video);
      this.playerEl.nativeElement.appendChild(outer);

      this.player = new Clappr.Player(setup);
      if (this.channel) {
        this.player.listenTo(this.player, Clappr.Events.PLAYER_PLAY, () => {
          this.startStats();
        });
        this.player.listenTo(this.player, Clappr.Events.PLAYER_STOP, () => {
          this.stopStats();
        });
        this.player.listenTo(this.player, Clappr.Events.PLAYER_PAUSE, () => {
          this.stopStats();
        });
      }
    }
  }

  private stopStats(): void {
    if (this.statsInterval){
      clearInterval(this.statsInterval);
      this.statsUid = null;
    }
  }

  private startStats(): void {
    this.stopStats();
    this.statsInterval = setInterval(() => {
      this.apiService.axios.post(`${environment.statsLiveUrl}/${this.channel}/stats`,{uid:this.statsUid}).then((res) => {
        this.statsUid = res.data.uid;
        this.nbViwer = res.data.viwer;
      });
    }, PlayerComponent.STATS_INTERVAL_DELAY);

  }

}
