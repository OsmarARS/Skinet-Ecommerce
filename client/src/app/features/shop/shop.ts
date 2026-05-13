import { Component, inject, signal } from '@angular/core';
import { ShopService } from '../../core/services/shopService';
import { Product } from '../../shared/models/product';
import { ProductItem } from './product-item/product-item';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialog } from './filters-dialog/filters-dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItem,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,
    MatIconButton,
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  products = signal<Pagination<Product> | null>(null);
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price Low-High', value: 'priceAsc' },
    { name: 'Price High-Low', value: 'priceDesc' },
  ];
  shopParams = new ShopParams();
  pageSizeOptions = [5, 10, 15, 20];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => this.products.set(response),
      error: (error) => console.log(error),
    });
  }

  onSearchChange() {
    this.shopParams.pageNumber.set(1);
    this.getProducts();
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber.set(event.pageIndex + 1);
    this.shopParams.pageSize.set(event.pageSize);
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopParams.sort.set(selectedOption.value);
      this.shopParams.pageNumber.set(1);
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialog, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands(),
        selectedTypes: this.shopParams.types(),
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.shopParams.brands.set(result.selectedBrands);
          this.shopParams.types.set(result.selectedTypes);
          this.shopParams.pageNumber.set(1);
          this.getProducts();
        }
      },
    });
  }
}
