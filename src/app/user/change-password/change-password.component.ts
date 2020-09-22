import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public resetPasswordSuccess: boolean;
  public resetPasswordError: boolean;
  public resetPasswordNotFound: boolean;
  public resetPasswordPending: boolean;
  public resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-z])(?=.*[0-9])\S{6,99}$/)
    ]),
    passwordConfirm: new FormControl('', [Validators.required])
  }, [(control: FormGroup): ValidationErrors | null => {
    return control.get('password').value != control.get('passwordConfirm').value ? { samePassword: true } : null;
  }]);
  private code: string;
  private userId: string;
  constructor(private readonly httpClient: HttpClient,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.userId = params['userId'];
    });
  }

  public resetPasswordSubmit(): void{
    this.resetPasswordPending = true;
    this.httpClient.put(`${environment.apiUrl}/user/${this.userId}/change-password`, {
      code: this.code,
      password: this.resetPasswordForm.get('password').value
    }).toPromise().then((data) => {
      this.resetPasswordPending = false;
      this.resetPasswordSuccess = true;
    }).catch((res) => {
      this.resetPasswordError = true;
    });
  }

}
