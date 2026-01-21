// src/app/components/compound-create/compound-create.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompoundService, Compound } from '../../services/compound.service';

@Component({
  selector: 'app-compound-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compound-create.html',
  styleUrls: ['./compound-create.css']
})
export class CompoundCreateComponent {
  compound: Partial<Compound> = {
    name: '',
    image: '',
    description: ''
  };
  
  saving: boolean = false;

  constructor(
    private compoundService: CompoundService,
    private router: Router
  ) { }

  createCompound(): void {
    if (!this.compound.name || !this.compound.image) {
      alert('Please fill in all required fields (Name and Image URL)');
      return;
    }

    this.saving = true;

    this.compoundService.createCompound(this.compound).subscribe({
      next: (response: any) => {
        console.log('Compound created:', response);
        alert('Compound created successfully!');
        
        // Navigate to the newly created compound's details page
        if (response.data && response.data.id) {
          this.router.navigate(['/compounds', response.data.id]);
        } else {
          this.router.navigate(['/compounds']);
        }
        
        this.saving = false;
      },
      error: (error) => {
        console.error('Error creating compound:', error);
        alert('Failed to create compound. Please try again.');
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/compounds']);
  }

  onImageError(event: any): void {
    event.target.src = 'https://placehold.co/200x150?text=Preview';
  }
}