import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';;

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  images = [
    'assets/img/slider/slider1.jpg',
    'assets/img/slider/slider2.jpg',
    'assets/img/slider/slider3.jpg',
    'assets/img/slider/slider4.jpg',
    'assets/img/slider/slider5.jpg',
    
  ];
  currentIndex: number = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
