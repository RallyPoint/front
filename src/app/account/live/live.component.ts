import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ApiService} from '../../share/api.service';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  public succes: boolean;
  public minDate: Date = new Date();
  @ViewChild('picker') picker: any;

  categories: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  languages: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  public changeInformationdForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    date: new FormControl('', []),
    desc: new FormControl('', []),
  }, [(control: FormGroup): ValidationErrors | null => {
    return null;
  }]);
  public user;
  public mode = 'preview';

  constructor(private readonly apiService: ApiService,
              private readonly authentificationService: AuthenticationService) { }

  ngOnInit(): void {
    this.apiService.axios.get('user/' + this.authentificationService.user.id).then((res) => {
      this.user = res.data;
      this.user.live.date = new Date(this.user.live.date);
      this.changeInformationdForm.patchValue({
        title: this.user.live.title,
        category: this.user.live.catLevel.id,
        language: this.user.live.catLanguage.id,
        date:  this.user.live.date,
        desc:  this.user.live.desc
      });
      console.log(res.data);
    });
    this.apiService.axios.get('categorie').then((res) => {
      this.languages = res.data.languages;
      this.categories = res.data.levels;
    });
  }

  renewLiveKey(){
    this.apiService.axios.put('lives/' + this.user.pseudo + '/new-key').then((res) => {
      this.user = res.data;
    });
  }

  changeInformationdSubmit(): void{
    console.log(this.changeInformationdForm.getRawValue());
    this.apiService.axios.put('lives/' + this.user.pseudo,
        this.changeInformationdForm.getRawValue()).then((res) => {
      this.user = res.data;
      this.succes = true;
    }, () => {
          this.succes = false;
    });
  }

}
