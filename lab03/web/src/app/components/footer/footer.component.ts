import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() authorName: string = 'Sebastian Raul Castillo Vasquez';
  currentYear: number = new Date().getFullYear();
  
  // Social media links - replace with actual URLs if needed
  socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/SebasRaul2503' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'www.linkedin.com/in/srcv25' }
  ];
}
