import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../core/services/api/products/products';
import { Delete } from '../../core/services/deleteProduct/delete';
import { ModalService } from '../../core/services/modal/modal.service';
import { ProductsList } from '../../core/services/productsList/products-list';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, MatCardModule, MatButtonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products implements OnInit {
  private productsList = inject(ProductsList);
  private modalService = inject(ModalService);
  private deleteService = inject(Delete);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  readonly products = this.productsList.products;
  readonly filteredProducts = computed(() => {
    const query = this.productsList.searchQuery().trim().toLowerCase();
    const list = this.products();

    if (!query) {
      return list;
    }

    return list.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        String(product.id).includes(query),
    );
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.productsList.getProductsList().subscribe({
      next: () => this.cdr.markForCheck(),
      error: (error) => console.error(error),
    });
  }

  openEditModal(product: Product): void {
    this.modalService.openEdit(product);
  }

  deleteProduct(product: Product): void {
    const confirmed = confirm(`¿Eliminar "${product.title}"?`);
    if (!confirmed) return;

    this.deleteService.deleteProduct(product.id).subscribe({
      next: () => {
        this.productsList.removeProduct(product.id);

        if (this.modalService.productToEdit()?.id === product.id) {
          this.modalService.closeEdit();
        }
      },
      error: (error) => console.error(error),
    });
  }
}
