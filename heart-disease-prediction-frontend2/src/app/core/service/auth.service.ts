import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_DATA_KEY = 'userData';

  constructor(
    private http: HttpService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string, role: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/login', { email, password, role })
      .pipe(
        tap(response => this.storeAuthData(response))
      );
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.getFromStorage(this.AUTH_TOKEN_KEY);
  }

  getUserRole(): string | null {
    const userData = this.getUserData();
    return userData?.role || null;
  }

  getUserData(): any {
    const userData = this.getFromStorage(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  private storeAuthData(response: LoginResponse): void {
    this.setInStorage(this.AUTH_TOKEN_KEY, response.token);
    this.setInStorage(this.USER_DATA_KEY, JSON.stringify(response.user));
  }

  private clearAuthData(): void {
    this.removeFromStorage(this.AUTH_TOKEN_KEY);
    this.removeFromStorage(this.USER_DATA_KEY);
  }

  // Platform-aware storage methods
  private setInStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('LocalStorage set error:', e);
      }
    }
  }

  private getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('LocalStorage get error:', e);
        return null;
      }
    }
    return null;
  }

  private removeFromStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('LocalStorage remove error:', e);
      }
    }
  }
}