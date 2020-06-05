import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { FormioResources } from 'angular-formio/resource';
import { FormioAuthService } from 'angular-formio/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
private sub: any;

constructor(
    private slimLoader: SlimLoadingBarService,
    private auth: FormioAuthService,
    private router: Router,
    public resources: FormioResources
          ) {
        // Listen the navigation events to start or complete the slim bar loading
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.slimLoader.start();
            } else if ( event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError) {
                this.slimLoader.complete();
            }
        }, (error: any) => {
            this.slimLoader.complete();
        });
        this.auth.onLogin.subscribe(() => {
            this.router.navigate(['/']);
          });
          this.auth.onLogout.subscribe(() => {
            this.router.navigate(['/auth/login']);
          });
          this.auth.onRegister.subscribe(() => {
            this.router.navigate(['/']);
          });
    }

    ngOnDestroy(): any {
        this.sub.unsubscribe();
    }
}
