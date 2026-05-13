import { Component, input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import {
  MatCard,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCard,
    MatCardContent,
    CurrencyPipe,
    MatCardActions,
    MatAnchor,
    MatIcon,
  ],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  product = input<Product | undefined>(undefined);
}
