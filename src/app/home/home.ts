import { Component, signal } from '@angular/core';
import { Products } from '../components/products/products';
import { Navbar } from '../components/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Products, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
