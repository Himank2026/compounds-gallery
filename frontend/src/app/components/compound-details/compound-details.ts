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
        // Since the data is inside response.data, we assign that to our variable
        if (response && response.success) {
          this.compound = response.data;
        } else {
          this.compound = response; // Fallback in case the structure changes
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

  deleteCompound(): void {
    if (!this.compound) return;

    // Confirmation dialog
    const confirmed = confirm(
      `Are you sure you want to delete "${this.compound.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    // Delete the compound
    this.compoundService.deleteCompound(this.compound.id).subscribe({
      next: (response: any) => {
        console.log('Delete response:', response);
        alert('Compound deleted successfully!');
        this.router.navigate(['/compounds']);
      },
      error: (error) => {
        console.error('Error deleting compound:', error);
        alert('Failed to delete compound. Please try again.');
      }
    });
  }
}