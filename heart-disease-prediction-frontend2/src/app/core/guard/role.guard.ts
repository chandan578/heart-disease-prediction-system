// core/guard/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

interface RouteData {
    role: string;
  }
@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = (route.data as RouteData).role;
    const userRole = this.authService.getUserRole();
    
    if (userRole !== expectedRole) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}