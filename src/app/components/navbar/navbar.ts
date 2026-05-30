import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/api/auth/auth';
import { ModalService } from '../../core/services/modal/modal.service';
import { ProductsList } from '../../core/services/productsList/products-list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  readonly modalService = inject(ModalService);
  readonly productsList = inject(ProductsList);

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.productsList.setSearchQuery(value);
  }

  openCreateModal(): void {
    this.modalService.openCreate();
  }

  logout(): void {
    this.productsList.setSearchQuery('');
    this.auth.logout();
    void this.router.navigate(['/']);
  }
}
