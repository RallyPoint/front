import {Component, Injectable, OnInit} from '@angular/core';
import {ApiService} from '../../share/api.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Utils} from "../../share/utils";

@Injectable()
export class HomeLivesResolver implements Resolve<any> {

  constructor(private readonly apiService: ApiService,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.apiService.axios.get('search/lives').then((res) => {
        if (!res.data || !res.data.length){
          observer.next([]);
          observer.complete();
          return;
        }
        this.apiService.axios.get(`${environment.statsLiveUrl}/stats`, {
          params : { channels : res.data.map((live) => live.user.pseudo) }
        }).then((resStats) => {
          observer.next(res.data.map((live) => {
            return Object.assign(live, {
              thumbnail: '/media/hls/' + live.user.pseudo + '-thumbnail.jpg',
              viwer : resStats ? resStats.data.find((stats) => stats.name === live.user.pseudo).viwer : null
            });
          }));
          observer.complete();
        }).catch(()=>{
          observer.next([]);
          observer.complete();
        });
      });
    });
  }
}


@Injectable()
export class HomeReplaysResolver implements Resolve<any> {

  constructor(private readonly apiService: ApiService,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.apiService.axios.get('replay').then((res) => {
        const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
        observer.next(res.data.map((replay) => {
          return Object.assign(replay, {thumbnail: baseUrlThumb + '/thumb/' + replay.user.pseudo + '/' + replay.file + '/thumb-1000.jpg'});
        }));
        observer.complete();
      }).catch(()=>{
        observer.next([]);
        observer.complete();
      });
    });
  }
}

@Injectable()
export class HomeMainLiveResolver implements Resolve<any> {

  constructor(private readonly apiService: ApiService,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.apiService.axios.get('lives/home/main').then((res) => {
        res.data.live.date = new Date( res.data.live.date);
        observer.next(res.data);
        observer.complete();
      }).catch(()=>{
        observer.next({});
        observer.complete();
      });
    });
  }
}
