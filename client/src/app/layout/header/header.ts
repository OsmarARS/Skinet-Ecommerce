import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [MatIcon, MatButton, MatBadge],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
