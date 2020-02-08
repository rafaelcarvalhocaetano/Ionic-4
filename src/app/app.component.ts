import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pages: { url: string, direction: string, icon: string, text: string }[];
  user: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      {url: '/task', direction: 'back', icon: 'checkmark', text: 'Tasks'},
      { url: '/task/create', direction: 'forward', icon: 'add', text: 'New Task'}
    ];
    this.authService.authState$.subscribe(user => {
      if (user && user !== null) {
        (this.user = user.displayName)
      }
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
