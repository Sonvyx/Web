import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from './models/video.model';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Dohvati token iz localStorage-a
    const token = localStorage.getItem('token');
    
    // Ako token ne postoji, korisnik nije ulogovan
    // Preusmjeri ga na login stranicu
  

    this.loadVideos();
  }

  private loadVideos(): void {
    setTimeout(() => {
      this.videos = [
        {
          id: 1,
          title: 'Kako započeti sa TikTok-om',
          description: 'Osnovni vodič za početnike koji žele započeti sa TikTok-om',
          thumbnailUrl: 'assets/images/video-thumbnails/tiktok-start.jpg',
          videoUrl: 'https://example.com/video1',
          duration: '15:30',
          uploadDate: '2024-03-15'
        },
        {
          id: 2,
          title: 'Najbolje prakse za rast pratilaca',
          description: 'Savjeti i trikovi za povećanje broja pratilaca',
          thumbnailUrl: 'assets/images/video-thumbnails/growth-tips.jpg',
          videoUrl: 'https://example.com/video2',
          duration: '20:15',
          uploadDate: '2024-03-14'
        },
        {
          id: 3,
          title: 'Analiza uspješnih TikTok trendova',
          description: 'Pregled trenutnih trendova i kako ih iskoristiti',
          thumbnailUrl: 'assets/images/video-thumbnails/trend-analysis.jpg',
          videoUrl: 'https://example.com/video3',
          duration: '18:45',
          uploadDate: '2024-03-13'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  playVideo(video: Video): void {
    console.log('Playing video:', video);
  }
} 