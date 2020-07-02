import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export class User {
    constructor(
        public email: string,
        public id: string,
        public token: string
    ) { }

}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    constructor (
        private http: HttpClient,
        private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + fireBaseApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError((responseErr: HttpErrorResponse) => {
                this.user.next(null);
                let errorMessage = 'Error Occurred';
                if (!responseErr.error || !responseErr.error.error) {
                    return throwError(errorMessage);
                }
                switch (responseErr.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'Email already exists';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'Email not Found';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'Invalid password';
                        break;
                }
                return throwError(errorMessage);
            }),
            tap( responseData => {
                const user = new User(responseData.email, responseData.localId, responseData.idToken);
                this.user.next(user);
                this.router.navigate(['/']);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + fireBaseApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError((responseErr: HttpErrorResponse) => {
                this.user.next(null);
                let errorMessage = 'Error Occurred';
                if (!responseErr.error || !responseErr.error.error) {
                    return throwError(errorMessage);
                }
                switch (responseErr.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'Email id already exists';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'Email not Found exists';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'Invalid password';
                        break;
                }
                return throwError(errorMessage);
            }),
            tap(responseData => {
                const user = new User(responseData.email, responseData.localId, responseData.idToken);
                this.user.next(user);
                this.router.navigate(['/']);
            })
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }
}
