import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-replays',
  templateUrl: './replays.component.html',
  styleUrls: ['./replays.component.scss']
})
export class ReplaysComponent implements OnInit {

  @ViewChild('paginator')
  paginator: MatPaginator;
  public replays: any;
  public loading: boolean = false;
  public defaultPageSize: number = 20;

  constructor(private httpClient: HttpClient,
              private authentificationService: AuthenticationService) {
    this.loadReplays(0, this.defaultPageSize);
  }

  ngOnInit(): void {
  }

  pageUpdate(event: PageEvent){
    this.loadReplays(event.pageIndex, event.pageSize);
  }

  public delete(replayId: string){
    this.httpClient.delete(`${environment.apiUrl}/replay/${replayId}`)
      .toPromise().then(() => {
      this.loadReplays(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  private loadReplays(pageIndex: number, pageSize: number){
    this.loading = true;
    this.httpClient.get(`${environment.apiUrl}search/replays`,
      {params: {
          user: this.authentificationService.dataValue.user.pseudo,
          pageIndex: pageIndex.toString(),
          pageSize: pageSize.toString()
      }}).toPromise().then((data: any) => {
        this.replays = data;
        this.loading = false;
      }).catch(() => this.loading = false );
  }

}
