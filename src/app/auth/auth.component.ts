import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    loginMode = true;
    appLoading = false;
    error = '';
    authForm: NgForm;

    constructor(private authService: AuthService) {}

    onSwitchLogin() {
        this.loginMode = !this.loginMode;
    }

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;

        let signupObserver: Observable<AuthResponseData>;
        this.appLoading = true;
        if (this.loginMode) {
            signupObserver = this.authService.login(email, password);
        } else {
            signupObserver = this.authService.signup(email, password);
        }

        signupObserver.subscribe(response => {
            form.reset();
            this.appLoading = false;
            this.error = '';
        }, error => {
            this.error = error;
            this.appLoading = false;
        });
    }


}
