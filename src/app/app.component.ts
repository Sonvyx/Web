import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FooterComponent } from './features/footer/footer.component';
import { NavigationComponent } from './features/navigation/navigation.component';
import { ScrollRestorationService } from './core/services/scrollposition.service';
import { ConfigService } from './core/services/config.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showNavAndFooter = true;

  constructor(private _scrollRestorationService: ScrollRestorationService, private configService: ConfigService, private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Current URL:', event.urlAfterRedirects);
        this.showNavAndFooter = !['/login'].includes(event.urlAfterRedirects);
      });
  }
  
  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: false
    });
    this.configService.loadConfig().subscribe();
  }
}

