import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecom-project';
  hideHeader: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideHeader = this.shouldHideHeader();
      }
    });
  }

  private shouldHideHeader(): boolean {
    // Check the current route and hide the header for specific routes
    const currentRoute = this.router.url;
    return (
      currentRoute === '/login' ||
      currentRoute === '/signup' ||
      currentRoute === '/forgotPassword'
    );
  }
}
