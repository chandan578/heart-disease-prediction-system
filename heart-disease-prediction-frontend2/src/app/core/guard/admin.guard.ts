import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token || userRole !== 'admin') {
      this.router.navigate(['/auth/login']); // Redirect to login if not a admin
      return false;
    }
    return true;
  }
}


// core/guard/admin.guard.ts

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { TokenService } from '../service/token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard implements CanActivate {

//   constructor(private tokenService: TokenService, private router: Router) {}

//   canActivate(): boolean {
//     const role = this.tokenService.getUserRole();

//     if (role === 'admin') {
//       return true;
//     } else {
//       this.router.navigate(['/auth/login']);
//       return false;
//     }
//   }
// }
