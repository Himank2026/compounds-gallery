// src/app/components/compound-details/compound-details.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CompoundService, Compound } from '../../services/compound.service';

@Component({
  selector: 'app-compound-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-details.html',
  styleUrls: ['./compound-details.css']
})
export class CompoundDetailsComponent implements OnInit {
  compound: Compound | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCompound(id);
  }

  loadCompound(id: number): void {
    this.loading = true;
    this.compoundService.getCompoundById(id).subscribe({
      next: (response: any) => {
        if (response && response.success) {
          this.compound = response.data;
        } else {
          this.compound = response;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading compound:', error);
        this.loading = false;
        this.router.navigate(['/compounds']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/compounds']);
  }

  editCompound(): void {
    if (this.compound) {
      this.router.navigate(['/compounds', this.compound.id, 'edit']);
    }
  }

  // FIXED: This is now inside the class brackets
  deleteCompound(): void {
    if (!this.compound) return;

    const confirmDelete = confirm(`Are you sure you want to delete ${this.compound.name}?`);
    
    if (confirmDelete) {
      this.loading = true;
      this.compoundService.deleteCompound(this.compound.id).subscribe({
        next: () => {
          alert('Compound deleted successfully!');
          this.router.navigate(['/compounds']);
        },
        error: (error) => {
          console.error('Delete error:', error);
          this.loading = false;
          alert('Failed to delete compound.');
        }
      });
    }
  }
} // This is the final closing brace for the class