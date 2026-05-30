import { Component } from '@angular/core';
import { Products } from '../components/products/products';
import { Navbar } from '../components/navbar/navbar';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Products, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
