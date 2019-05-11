import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, tap, take } from 'rxjs/operators';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map(x => `/${x}`).join('');
    // take retorna a qtd de valores esperados
    return this.checkAuthState(url).pipe(take(1));
  }

  // metod of verification access
  private checkAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAuthentication.pipe(
      tap(x => {
        if (!x) {
          this.router.navigate(['/login'], {
            // informa como ultimo parametro da rota
            queryParams: { redirect }
          });
        }
      })
    );
  }
}
