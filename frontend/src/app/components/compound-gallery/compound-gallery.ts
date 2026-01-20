import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-compound-gallery',
  templateUrl: './compound-gallery.component.html',
  styleUrls: ['./compound-gallery.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CompoundGalleryComponent implements OnInit {
  compounds: Compound[] = [];
  loading = false;
  error = '';
  
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  itemsPerPage = 10;
  
  Math = Math; // Make Math available in template

  constructor(
    private compoundService: CompoundService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCompounds();
  }

  loadCompounds(): void {
    this.loading = true;
    this.error = '';

    this.compoundService.getCompounds(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          if (response.success && Array.isArray(response.data)) {
            this.compounds = response.data;
            if (response.pagination) {
              this.currentPage = response.pagination.currentPage;
              this.totalPages = response.pagination.totalPages;
              this.totalItems = response.pagination.totalItems;
            }
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load compounds. Please make sure the backend server is running.';
          this.loading = false;
          console.error('Error loading compounds:', err);
        }
      });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/compounds', id]);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCompounds();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getShortDescription(description: string): string {
    if (!description) return 'No description available';
    return description.length > 100 
      ? description.substring(0, 100) + '...' 
      : description;
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
  }
}