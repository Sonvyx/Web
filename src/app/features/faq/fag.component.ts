import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  faqs = [
    {
      question: 'Koji su dodatni troškovi povezani s ostvarivanjem prihoda na TikToku?',
      answer: 'Dodatna ulaganja nisu potrebna. Opcije poput SIM kartice ili unaprijed monetiziranih profila mogu ubrzati proces generiranja prihoda, ali nisu obavezne.'
    },
    {
      question: 'Kako ostvariti prihod na Balkanu ako TikTok ne omogućava monetizaciju?',
      answer: 'To je jednostavno – kreiranjem sadržaja za tržišta na kojima je TikTok monetizacija dozvoljena, čime možete ostvarivati prihod.'
    },
    {
      question: 'Da li je moguće zaraditi bez 10.000 pratilaca na TikToku?',
      answer: 'Nažalost, nije. Ipak, uz naš niche drop saznat ćete koji sadržaj je trenutno u trendu i kako napraviti slične videozapise, što će vam pomoći da brzo privuče pratioce.'
    }
  ];

  readonly panelOpenState = signal(false);
}