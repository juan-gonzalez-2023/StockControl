import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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

  readonly products = this.productsList.products;

  ngOnInit(): void {
    this.productsList.getProductsList().subscribe({
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
