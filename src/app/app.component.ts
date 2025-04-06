import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { FaqComponent } from './features/faq/fag.component';
import { FooterComponent } from './features/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { NavigationComponent } from './features/navigation/navigation.component';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, HeroComponent, AboutComponent, FaqComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: false
    });
  }
}
