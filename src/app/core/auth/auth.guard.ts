import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

/**
 * Redirects unauthenticated users to login page
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.hasLoadedAuth) {
      return this.checkAuth();
    } else {
      return this.authService.authSubject.pipe(
        map(() => this.checkAuth()),
      );
    }
  }

  /**
   * Checks if the user is authenticated, else routes user to login page
   */
  checkAuth(): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    } else {
      // Redirect to login page when not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}
