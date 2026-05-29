import { Component, inject } from '@angular/core';
import { ModalService } from '../../core/services/modal/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly modalService = inject(ModalService);

  openCreateModal(): void {
    this.modalService.openCreate();
  }
}
