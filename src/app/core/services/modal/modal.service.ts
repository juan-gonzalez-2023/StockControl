import { Injectable, signal } from '@angular/core';
import { Product } from '../api/products/products';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  readonly isCreateOpen = signal(false);
  readonly isEditOpen = signal(false);
  readonly productToEdit = signal<Product | null>(null);

  openCreate(): void {
    this.isCreateOpen.set(true);
  }

  closeCreate(): void {
    this.isCreateOpen.set(false);
  }

  openEdit(product: Product): void {
    this.productToEdit.set(product);
    this.isEditOpen.set(true);
  }

  closeEdit(): void {
    this.isEditOpen.set(false);
    this.productToEdit.set(null);
  }
}
