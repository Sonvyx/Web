import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isMobileMenuOpen: boolean = false;
  isScrolled: boolean = false;
  isWhiteBackground = false;

  @HostListener('window:scroll', [])

  onWindowScroll = (): void => {
    this.isScrolled = window.scrollY > 40;
    this.checkBackgroundColor();
  }

  ngOnInit(): void {
    this.checkBackgroundColor();
  }

  toggleMobileMenu = (): void => {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  checkBackgroundColor = (): void => {
    const excludedPaths = ['/', '/index.html', '/home'];
    this.isWhiteBackground = !excludedPaths.includes(window.location.pathname);
  };
}