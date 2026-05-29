import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  readonly isCreateOpen = signal(false);

  openCreate(): void {
    this.isCreateOpen.set(true);
  }

  closeCreate(): void {
    this.isCreateOpen.set(false);
  }
}
