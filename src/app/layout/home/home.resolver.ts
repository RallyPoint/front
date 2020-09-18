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
      this.apiService.axios.get('search/lives',{params: {pageSize:10}}).then((res) => {
        if (!res.data.count){
          observer.next([]);
          observer.complete();
          return;
        }
        res.data.items = res.data.items.map((live) => {
          return Object.assign(live, {
            thumbnail: '/media/hls/' + live.user.pseudo + '-thumbnail.jpg'
          });
        });
        this.apiService.axios.get(`${environment.statsLiveUrl}/stats`, {
          params : { channels : res.data.items.map((live) => live.user.pseudo) }
        }).then((resStats) => {
          observer.next(res.data.items.map((live) => {
            return Object.assign(live, {
              viwer : resStats ? resStats.data.find((stats) => stats.name === live.user.pseudo).viwer : null
            });
          }));
          observer.complete();
        }).catch(()=>{
          observer.next(res.data.items);
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
      this.apiService.axios.get('search/replays',{params: {pageSize:10}}).then((res) => {
        const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
        observer.next(res.data.items.map((replay) => {
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
