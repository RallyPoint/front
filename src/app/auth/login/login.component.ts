import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public ssoLoading: boolean = false;
  public ssoUrl: string;
  public resetPassword: boolean = false;
  public completSSO : boolean = false;
  public completSSOCode: string;
  public completSSOMiss: string[] = [];
  public completSSOForm: {email: string} = {email:""};
  public resetPasswordForm: {email: string} = {email:""};
  public resetPasswordSended: boolean = false;
  public resetPasswordError: boolean = false;
  public resetPasswordNotFound: boolean = false;

  public logInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  public signInForm = new FormGroup({
    pseudo: new FormControl('',[Validators.required]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*[A-z])(?=.*[0-9])\S{6,99}$/)
    ]),
    passwordConfirm: new FormControl('',[Validators.required]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
  },[(control: FormGroup): ValidationErrors | null => {
    return control.get('password').value != control.get('passwordConfirm').value ? { 'samePassword': true } : null;
  }]);
  constructor(protected readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.ssoLoading = true;
    this.ssoUrl = "https://github.com/login/oauth/authorize?client_id=4b64a6e73596ba9eac5f&scope=user";
  }

  loginGitHub(){
    this.authenticationService.githubLogin().then(()=>{

    },(e)=>{
      if(e.miss){
        this.completSSO = true;
        this.completSSOMiss = e.miss;
      }
    });
  }

  resetPasswordSubmit(){
    this.authenticationService.resetPassword(this.resetPasswordForm.email).then((data)=>{
      this.resetPasswordSended = true;
    }).catch((res)=>{
      if(res.response.status === 404){
        this.resetPasswordError = true;
      }else{
        this.resetPasswordNotFound = true;
      }
    });
  }

  completSSOSubmit(){
    this.authenticationService.githubLogin(this.completSSOForm).then((data)=>{
      console.log("success",data);
    });
  }

  signInSubmit(){
    this.authenticationService.register(this.signInForm.getRawValue().pseudo,this.signInForm.getRawValue().password,this.signInForm.getRawValue().email);
  }

  logInSubmit(){
    this.authenticationService.login(this.logInForm.getRawValue().email,this.logInForm.getRawValue().password);
  }
}
