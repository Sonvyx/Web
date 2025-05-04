import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FooterComponent } from './features/footer/footer.component';
import { NavigationComponent } from './features/navigation/navigation.component';
import { ScrollRestorationService } from './core/services/scrollposition.service';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _scrollRestorationService: ScrollRestorationService, private configService: ConfigService) {

  }
  
  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: false
    });
    this.configService.loadConfig().subscribe();
  }
}
