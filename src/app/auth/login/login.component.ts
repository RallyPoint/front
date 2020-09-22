import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public ssoLoading = false;
  public ssoUrl: string;
  public resetPassword = false;
  public completSSO = false;
  public completSSOCode: string;
  public completSSOMiss: string[] = [];
  public completSSOForm: {email: string} = {email: ''};
  public resetPasswordForm: {email: string} = {email: ''};
  public resetPasswordSended = false;
  public resetPasswordError = false;
  public resetPasswordNotFound = false;
  public inscriptionFail = false;
  public inscriptionSucces = false;
  public defaultSelectedTab = 0;

  public logInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  public signInForm = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-z])(?=.*[0-9])\S{6,99}$/)
    ]),
    passwordConfirm: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
  }, [(control: FormGroup): ValidationErrors | null => {
    return control.get('password').value != control.get('passwordConfirm').value ? { samePassword: true } : null;
  }]);

  constructor(protected readonly authenticationService: AuthenticationService, @Inject(MAT_DIALOG_DATA) public data: {mode: boolean}, public dialogRef: MatDialogRef<LoginComponent>) {
    this.defaultSelectedTab = data.mode ? 0 : 1;
  }

  ngOnInit(): void {
    this.ssoLoading = true;
    this.ssoUrl = 'https://github.com/login/oauth/authorize?client_id=941edbebbc817c7684fc&scope=user';
  }

  close(){
    this.dialogRef.close();
  }

  loginGitHub(){
    this.authenticationService.githubLogin().then(() => {
      this.dialogRef.close();
    }, (e) => {
      if (e.miss){
        this.completSSO = true;
        this.completSSOMiss = e.miss;
      }
    });
  }

  resetPasswordSubmit(){
    this.authenticationService.resetPassword(this.resetPasswordForm.email).then((data) => {
      this.resetPasswordSended = true;
    }).catch((res) => {
      if (res.response.status === 404){
        this.resetPasswordError = true;
      }else{
        this.resetPasswordNotFound = true;
      }
    });
  }

  completSSOSubmit(){
    this.authenticationService.githubLogin(this.completSSOForm).then((data) => {
    });
  }

  signInSubmit(){
    this.authenticationService.register(
      this.signInForm.getRawValue().pseudo,
      this.signInForm.getRawValue().password,
      this.signInForm.getRawValue().email
    ).then(() => {
      this.inscriptionSucces = true;
    }).catch(() => {
      this.inscriptionFail = true;
    });
  }

  logInSubmit(){
    this.authenticationService.login(this.logInForm.getRawValue().email, this.logInForm.getRawValue().password);
  }
}
