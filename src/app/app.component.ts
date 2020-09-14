import {Component, OnInit} from '@angular/core';
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  implements OnInit {
  title = 'rallypointtech';

  constructor(
    private router: Router,
    private gtmService: GoogleTagManagerService,
  ) {
  }


  ngOnInit() {
    // push GTM data layer for every visited page
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url
        };

        this.gtmService.pushTag(gtmTag);
      }
    });
  }
}
