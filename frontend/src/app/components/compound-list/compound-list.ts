// src/app/components/compound-list/compound-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompoundService, Compound } from '../../services/compound.service';

@Component({
  selector: 'app-compound-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-list.html',
  styleUrls: ['./compound-list.css']
})
export class CompoundListComponent implements OnInit {
  compounds: Compound[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;
  loading: boolean = false;

  constructor(
    private compoundService: CompoundService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCompounds();
  }

  loadCompounds(): void {
    this.loading = true;
    this.compoundService.getCompounds(this.currentPage, this.limit)
      .subscribe({
        next: (response: any) => {
          console.log('Backend Response:', response);

          this.compounds = response.data;
          
          if (response.pagination) {
            this.totalPages = response.pagination.totalPages;
          }
          
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading compounds:', error);
          this.loading = false;
        }
      });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/compounds', id]);
  }

  createNew(): void {
    this.router.navigate(['/compounds/new']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCompounds();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCompounds();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCompounds();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}