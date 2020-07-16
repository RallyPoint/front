import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ApiService} from "../../share/api.service";
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  public succes : boolean;

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
  },[(control: FormGroup): ValidationErrors | null => {
    return null;
  }]);
  public user;

  constructor(private readonly apiService : ApiService,
              private readonly authentificationService: AuthenticationService) { }

  ngOnInit(): void {
    this.apiService.axios.get('user/'+this.authentificationService.user.id).then((res)=>{
      this.user = res.data;
      this.changeInformationdForm.patchValue({
        title:this.user.live.title,
        category:this.user.live.catLevel.id,
        language:this.user.live.catLanguage.id,
      });
      console.log(res.data);
    });
    this.apiService.axios.get('categorie').then((res)=>{
      this.languages = res.data.languages;
      this.categories = res.data.levels;
    })
  }

  renewLiveKey(){
    this.apiService.axios.put('lives/'+this.user.pseudo+'/new-key').then((res)=>{
      this.user = res.data;
    })
  }

  changeInformationdSubmit(): void{
    console.log(this.changeInformationdForm.getRawValue());
    this.apiService.axios.put('lives/'+this.user.pseudo,
        this.changeInformationdForm.getRawValue()).then((res)=>{
      this.user = res.data;
      this.succes = true;
    },()=>{
          this.succes = false;
    })
  }

}
