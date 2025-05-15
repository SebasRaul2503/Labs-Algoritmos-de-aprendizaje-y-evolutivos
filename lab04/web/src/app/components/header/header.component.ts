import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('scrollAnimation', [
      state('default', style({
        height: '120px',
        padding: '20px 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      })),
      state('scrolled', style({
        height: '80px',
        padding: '10px 0',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
      })),
      transition('default => scrolled', animate('200ms ease-in')),
      transition('scrolled => default', animate('200ms ease-out'))
    ])
  ]
})
export class HeaderComponent {
  @Input() title: string = 'Algoritmo Hill Climbing';
  
  scrollState: string = 'default';
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrollState = scrollPosition > 50 ? 'scrolled' : 'default';
  }
}
