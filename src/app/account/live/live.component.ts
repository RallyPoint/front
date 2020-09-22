import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../../auth/authentication.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  public succes: boolean;
  public minDate: Date = new Date();
  @ViewChild('picker') picker: any;

  public categories: any[] = [];
  public languages: any[] = [];
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

  constructor(private readonly httpClient: HttpClient,
              private readonly authentificationService: AuthenticationService) { }

  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/user/${this.authentificationService.dataValue.user.id}`)
      .toPromise().then((data: any) => {
      this.user = data;
      this.previewImage = '/media/live/' + data.live.thumb;
      this.user.live.date = new Date(this.user.live.date);
      this.changeInformationdForm.patchValue({
        title: this.user.live.title,
        category: this.user.live.catLevel.id,
        language: this.user.live.catLanguage.id,
        date:  this.user.live.date,
        desc:  this.user.live.desc
      });
    });
    this.httpClient.get(`${environment.apiUrl}/categorie`)
      .toPromise().then((data: any) => {
      this.languages = data.languages;
      this.categories = data.levels;
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
    this.httpClient.put(`${environment.apiUrl}/lives/${this.user.pseudo}/new-key`, {})
      .toPromise().then((data: any) => {
      this.user = data;
    });
  }

  changeInformationdSubmit(): void{

    this.succes = null;
    const formData = new FormData();
    formData.append('title', this.changeInformationdForm.get('title').value);
    formData.append('category', this.changeInformationdForm.get('category').value);
    formData.append('language', this.changeInformationdForm.get('language').value);
    formData.append('desc', this.changeInformationdForm.get('desc').value);
    if (this.changeInformationdForm.get('thumb').value){
      formData.append('thumb', this.changeInformationdForm.get('thumb').value);
    }

    this.httpClient.put(`${environment.apiUrl}/lives/${this.user.pseudo}`, formData)
      .toPromise().then((data: any) => {
      this.user = data;
      this.succes = true;
    }, () => {
      this.succes = false;
    });
  }

}
