import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    subscription: Subscription;
    isAuthenticated = false;

    constructor(
        private authService: AuthService) {

    }

    onLogout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.subscription = this.authService.user.subscribe(isAuthenticated => {
            this.isAuthenticated = !!isAuthenticated;
        });
    }
}
