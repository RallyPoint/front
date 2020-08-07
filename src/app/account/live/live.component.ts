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
  public previewImage;
  public changeInformationdForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    thumb: new FormControl('', [Validators.required]),
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
      this.previewImage = "/media/live/"+res.data.thumb;
      this.user.live.date = new Date(this.user.live.date);
      this.changeInformationdForm.patchValue({
        title: this.user.live.title,
        category: this.user.live.catLevel.id,
        language: this.user.live.catLanguage.id,
        date:  this.user.live.date,
        desc:  this.user.live.desc
      });
    });
    this.apiService.axios.get('categorie').then((res) => {
      this.languages = res.data.languages;
      this.categories = res.data.levels;
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.changeInformationdForm.patchValue({
        thumb: file
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  renewLiveKey(){
    this.apiService.axios.put('lives/' + this.user.pseudo + '/new-key').then((res) => {
      this.user = res.data;
    });
  }

  changeInformationdSubmit(): void{

    this.succes = null;
    const formData = new FormData();
    formData.append('title', this.changeInformationdForm.get('title').value);
    formData.append('category', this.changeInformationdForm.get('category').value);
    formData.append('language', this.changeInformationdForm.get('language').value);
    formData.append('date', this.changeInformationdForm.get('date').value);
    formData.append('desc', this.changeInformationdForm.get('desc').value);
    if (this.changeInformationdForm.get('thumb').value){
      formData.append('thumb', this.changeInformationdForm.get('thumb').value);
    }

    this.apiService.axios.put('lives/' + this.user.pseudo,
      this.changeInformationdForm.getRawValue()).then((res) => {
      this.user = res.data;
      this.succes = true;
    }, () => {
      this.succes = false;
    });
  }

}
