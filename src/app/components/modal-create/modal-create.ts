import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Create } from '../../core/services/createProduct/create';
import { Product } from '../../core/services/api/products/products';
import { ProductsList } from '../../core/services/productsList/products-list';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './modal-create.html',
  styleUrl: './modal-create.scss',
})
export class ModalCreate {
  private fb = inject(FormBuilder);
  private create = inject(Create);
  private productsList = inject(ProductsList);

  readonly closed = output<void>();

  readonly nextId = this.productsList.getNextId();

  readonly form = this.fb.nonNullable.group({
    id: [{ value: this.nextId, disabled: true }],
    title: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
  });

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, price, description, category, image } = this.form.getRawValue();

    this.create.postProduct({ title, price, description, category, image }).subscribe({
      next: () => {
        const newProduct: Product = {
          id: this.nextId,
          title,
          price,
          description,
          category,
          image,
          rating: { rate: 0, count: 0 },
        };
        this.productsList.addProduct(newProduct);
        this.close();
      },
      error: (error) => console.error(error),
    });
  }
}
