import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-compound-edit',
  templateUrl: './compound-edit.component.html',
  styleUrls: ['./compound-edit.component.css']
})
export class CompoundEditComponent implements OnInit {
  compound: Compound | null = null;
  saving = false;
  compoundId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.compoundId = +params['id'];
      if (this.compoundId) {
        this.loadCompound(this.compoundId);
      }
    });
  }

  loadCompound(id: number): void {
    this.compoundService.getCompoundById(id).subscribe({
      next: (response) => {
        if (response.success && !Array.isArray(response.data)) {
          this.compound = { ...response.data };
        }
      },
      error: (err) => {
        alert('Failed to load compound');
        this.goBack();
        console.error('Error loading compound:', err);
      }
    });
  }

  saveChanges(): void {
    if (!this.compound) return;

    if (!this.compound.name || !this.compound.image) {
      alert('Please fill in all required fields');
      return;
    }

    this.saving = true;

    this.compoundService.updateCompound(this.compoundId, {
      name: this.compound.name,
      image: this.compound.image,
      description: this.compound.description
    }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Compound updated successfully!');
          this.router.navigate(['/compounds', this.compoundId]);
        }
        this.saving = false;
      },
      error: (err) => {
        alert('Failed to update compound');
        this.saving = false;
        console.error('Error updating compound:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/compounds', this.compoundId]);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/200x150?text=Preview';
  }
}
}
