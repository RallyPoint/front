import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../share/api.service';
import {AuthenticationService} from '../../auth/authentication.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

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

  constructor(private apiService: ApiService,
              private authentificationService: AuthenticationService) {
    this.loadReplays(0,this.defaultPageSize);
  }

  ngOnInit(): void {
  }

  pageUpdate(event: PageEvent){
    this.loadReplays(event.pageIndex, event.pageSize);
  }

  public delete(replayId: string){
    this.apiService.axios.delete(`/replay/${replayId}`).then(()=>{
      this.loadReplays(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  private loadReplays(pageIndex: number, pageSize: number){
    this.loading = true;
    this.apiService.axios.get('search/replays',
      {params: {
          user: this.authentificationService.user.pseudo,
          pageIndex,
          pageSize
      }})
      .then((res) => {
        this.replays = res.data;
        this.loading = false;
      }).catch(() => this.loading = false );
  }

}
