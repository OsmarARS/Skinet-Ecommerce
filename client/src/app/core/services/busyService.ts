import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  loading = signal<boolean>(false);
  busyRequestCount = signal<number>(0);

  busy() {
    this.busyRequestCount.update((value) => value + 1);
    this.loading.set(true);
  }

  idle() {
    this.busyRequestCount.update((value) => value - 1);
    if (this.busyRequestCount() <= 0) {
      this.busyRequestCount.set(0);
      this.loading.set(false);
    }
  }
}
