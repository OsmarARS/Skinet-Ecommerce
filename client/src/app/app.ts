import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  imports: [Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  products = signal<Product[]>([]);

  protected readonly title = signal('Skinet');

  ngOnInit(): void {
    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: (response) => this.products.set(response.data),
      error: (error) => console.log(error),
      complete: () => console.log('Complete'),
    });
  }
}
