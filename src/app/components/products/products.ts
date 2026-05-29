import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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

  readonly products = this.productsList.products;

  ngOnInit(): void {
    this.productsList.getProductsList().subscribe({
      error: (error) => console.error(error),
    });
  }
}