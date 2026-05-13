import { signal } from '@angular/core';

export class ShopParams {
  brands = signal<string[]>([]);
  types = signal<string[]>([]);
  sort = signal<string>('name');
  pageNumber = signal(1);
  pageSize = signal(10);
  search = signal('');
}
