import { Component } from '@angular/core';
import { Products } from '../components/products/products';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Products],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
