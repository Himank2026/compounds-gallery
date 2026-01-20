import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-compound-details',
  templateUrl: './compound-details.component.html',
  styleUrls: ['./compound-details.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CompoundDetailsComponent implements OnInit {
  compound: Compound | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadCompound(id);
      }
    });
  }

  loadCompound(id: number): void {
    this.loading = true;
    this.error = '';

    this.compoundService.getCompoundById(id).subscribe({
      next: (response) => {
        if (response.success && !Array.isArray(response.data)) {
          this.compound = response.data;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load compound details';
        this.loading = false;
        console.error('Error loading compound:', err);
      }
    });
  }

  editCompound(): void {
    if (this.compound) {
      this.router.navigate(['/compounds', this.compound.id, 'edit']);
    }
  }

  deleteCompound(): void {
    if (!this.compound) return;

    if (confirm(`Are you sure you want to delete "${this.compound.name}"?`)) {
      this.compoundService.deleteCompound(this.compound.id).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Compound deleted successfully');
            this.router.navigate(['/compounds']);
          }
        },
        error: (err) => {
          alert('Failed to delete compound');
          console.error('Error deleting compound:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/compounds']);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
  }
}

