import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {LoginService} from './login.service';

@Injectable()
export class IsConnectedGuard implements CanActivate {

  constructor(private auth: AuthenticationService,
              private router: Router,
              private loginService: LoginService) {
  }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const status: boolean = this.auth.isLogged();
    if (!status){
      this.loginService.openAuthModal(true);
      this.router.navigate(['/']);
    }
    return status;
  }

}
