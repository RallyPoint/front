import {ElementRef, Component, OnInit, ViewChild} from '@angular/core';
import * as p2pml from 'p2p-media-loader-shaka';
import * as shaka from 'shaka-player';
import * as muxJs from 'mux.js';
import {EventEmitter} from "events";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @ViewChild('playerEl') playerEl:ElementRef;

  constructor() { }

  ngOnInit(): void {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported() && p2pml.Engine.isSupported()) {
      const engine = new p2pml.Engine();

      var player = new shaka.Player(this.playerEl.nativeElement);
      player.addEventListener("error",(error) => { console.error("Error code", error.detail.code, "object", error.detail); });

      engine.initShakaPlayer(player);

      player.load("https://akamai-axtest.akamaized.net/routes/lapd-v1-acceptance/www_c4/Manifest.mpd").catch(
        (error) => { console.error("Error code", error.code, "object", error); }
      );
    } else {
      document.write("Not supported :(");
    }
  }

}
interface Tata {
  on(eventName: string, listener: (...params: any[]) => void): this;
}
class Toto extends EventEmitter implements Tata{
  lol(){
    console.log('aze');
  }
}
