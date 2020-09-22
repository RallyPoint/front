import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ChannelResolver implements Resolve<any> {

  constructor(private readonly httpClient: HttpClient,
              private readonly route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable(observer => {
      this.httpClient.get(`${environment.apiUrl}/lives/${route.params.liveName}`)
        .toPromise().then((data: any) => {
        const userChannel = data;
        userChannel.live.date = new Date(userChannel.live.date);
        observer.next(userChannel);
        observer.complete();
      });
    });
  }
}
