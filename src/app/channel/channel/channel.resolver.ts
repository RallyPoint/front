import {Component, Injectable, OnInit} from '@angular/core';
import {ApiService} from '../../share/api.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class ChannelResolver implements Resolve<any> {

  constructor(private readonly apiService: ApiService,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.apiService.axios.get('lives/' + route.params.liveName).then((res) => {
        const userChannel = res.data;
        userChannel.live.date = new Date(userChannel.live.date);
        observer.next(userChannel);
        observer.complete();
      });
    });
  }
}
