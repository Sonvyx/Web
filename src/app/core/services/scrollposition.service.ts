import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',  
})
export class ScrollRestorationService {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition, 10));
        }
      }
    });

    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    });
  }
  saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  }
}
