import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ApiService} from '../../share/api.service';
import {AuthenticationService} from '../../auth/authentication.service';
import * as showdown from 'showdown';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public previewImage;
  public succes: boolean = null;
  public previewMarkDown: string = "";
  public markDownRender: showdown.Converter = new showdown.Converter();

  public changeInformationdForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pseudo: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    passwordConf: new FormControl(''),
    password: new FormControl(''),
    desc: new FormControl('')
  }, [(control: FormGroup): ValidationErrors | null => {
    return control.get('password').value != control.get('passwordConf').value ? { samePassword: true } : null;
  }]);

  constructor(private readonly apiService: ApiService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.apiService.axios.get('user/' + this.authenticationService.user.id).then((res) => {
      this.previewImage = '/media/avatar/' + res.data.avatar;
      this.changeInformationdForm.patchValue({
        email: res.data.email,
        pseudo: res.data.pseudo,
        desc: res.data.desc
      });
    });
  }

  updateMarkDown(event){
    this.previewMarkDown = this.markDownRender.makeHtml(event);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.changeInformationdForm.patchValue({
        avatar: file
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  changeInformationdSubmit(){
    this.succes = null;
    const formData = new FormData();
    formData.append('email', this.changeInformationdForm.get('email').value);
    formData.append('pseudo', this.changeInformationdForm.get('pseudo').value);
    formData.append('avatar', this.changeInformationdForm.get('avatar').value);
    formData.append('desc', this.changeInformationdForm.get('desc').value);
    if (this.changeInformationdForm.get('password').value){
      formData.append('passwordConf', this.changeInformationdForm.get('passwordConf').value);
      formData.append('password', this.changeInformationdForm.get('password').value);
    }
    this.apiService.axios.put('user/' + this.authenticationService.user.id, formData).then(() => {
      this.succes = true;
    }, () => {
      this.succes = false;
    });
  }

}
