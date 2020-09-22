import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Utils} from '../../share/utils';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HomeLivesResolver implements Resolve<any> {

  constructor(private readonly httpClient: HttpClient,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.httpClient.get(`${environment.apiUrl}/search/lives`, {params: { pageSize: '10'}})
        .toPromise().then((data: any) => {
        if (!data.count){
          observer.next([]);
          observer.complete();
          return;
        }
        data.items = data.items.map((live) => {
          return Object.assign(live, {
            thumbnail: '/media/hls/' + live.user.pseudo + '-thumbnail.jpg'
          });
        });
        this.httpClient.get(`${environment.statsLiveUrl}/stats`, {
          params : { channels : data.items.map((live) => live.user.pseudo) }
        }).toPromise().then((dataStats: any) => {
          observer.next(data.items.map((live) => {
            return Object.assign(live, {
              viwer : dataStats ? dataStats.find((stats) => stats.name === live.user.pseudo).viwer : null
            });
          }));
          observer.complete();
        }).catch(() => {
          observer.next(data.items);
          observer.complete();
        });
      });
    });
  }
}


@Injectable()
export class HomeReplaysResolver implements Resolve<any> {

  constructor(private readonly httpClient: HttpClient,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.httpClient.get(`${environment.apiUrl}/search/replays`, {params: { pageSize: '10'}})
        .toPromise().then((data: any) => {
        const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
        observer.next(data.items.map((replay) => {
          return Object.assign(replay, {thumbnail: baseUrlThumb + '/thumb/' + replay.user.pseudo + '/' + replay.file + '/thumb-1000.jpg'});
        }));
        observer.complete();
      }).catch(() => {
        observer.next([]);
        observer.complete();
      });
    });
  }
}

@Injectable()
export class HomeMainLiveResolver implements Resolve<any> {

  constructor(private readonly httpClient: HttpClient,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.httpClient.get(`${environment.apiUrl}/lives/home/main`)
        .toPromise().then((data: any) => {
        data.live.date = new Date( data.live.date);
        observer.next(data);
        observer.complete();
      }).catch(() => {
        observer.next({});
        observer.complete();
      });
    });
  }
}
