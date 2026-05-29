import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../core/services/api/products/products';
import { Edit } from '../../core/services/editProduct/edit';
import { ProductsList } from '../../core/services/productsList/products-list';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.scss',
})
export class ModalEdit implements OnInit {
  private fb = inject(FormBuilder);
  private editService = inject(Edit);
  private productsList = inject(ProductsList);

  readonly product = input.required<Product>();
  readonly closed = output<void>();

  readonly form = this.fb.nonNullable.group({
    id: [{ value: 0, disabled: true }],
    title: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
  });

  ngOnInit(): void {
    const product = this.product();
    this.form.patchValue({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
  }

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
    const current = this.product();

    const updatedProduct: Product = {
      ...current,
      title,
      price,
      description,
      category,
      image,
    };

    this.editService.putProduct(current.id, updatedProduct).subscribe({
      next: () => {
        this.productsList.updateProduct(updatedProduct);
        this.close();
      },
      error: (error) => console.error(error),
    });
  }
}
