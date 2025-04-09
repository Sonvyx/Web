import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FooterComponent } from './features/footer/footer.component';
import { NavigationComponent } from './features/navigation/navigation.component';
import { ScrollRestorationService } from './core/services/scrollposition.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _scrollRestorationService: ScrollRestorationService){

  }
  
  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: false
    });
  }
}
