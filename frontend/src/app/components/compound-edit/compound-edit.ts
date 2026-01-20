// src/app/components/compound-edit/compound-edit.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompoundService, Compound } from '../../services/compound.service';

@Component({
  selector: 'app-compound-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compound-edit.html',
  styleUrls: ['./compound-edit.css']
})
export class CompoundEditComponent implements OnInit {
  compound: Compound | null = null;
  loading: boolean = true;
  saving: boolean = false;

  // Form fields
  name: string = '';
  image: string = '';
  description: string = '';

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
      // FIX: Access the .data property from the backend response
      const data = response.data || response;
      
      this.compound = data;
      this.name = data.name || '';
      this.image = data.image || '';
      this.description = data.description || '';
      
      this.loading = false;
    },
    error: (error) => {
      console.error('Error loading compound:', error);
      this.loading = false;
      this.router.navigate(['/compounds']);
    }
  });
}

  saveChanges(): void {
    if (!this.compound) return;

    if (!this.name.trim()) {
      alert('Name is required!');
      return;
    }

    if (!this.description.trim()) {
      alert('Description is required!');
      return;
    }

    this.saving = true;

    const updatedData = {
      name: this.name.trim(),
      image: this.image.trim(),
      description: this.description.trim()
    };

    this.compoundService.updateCompound(this.compound.id, updatedData).subscribe({
      next: (response) => {
        this.saving = false;
        alert('Compound updated successfully!');
        this.router.navigate(['/compounds', this.compound!.id]);
      },
      error: (error) => {
        console.error('Error updating compound:', error);
        this.saving = false;
        alert('Failed to update compound!');
      }
    });
  }

  cancel(): void {
    if (this.compound) {
      this.router.navigate(['/compounds', this.compound.id]);
    } else {
      this.router.navigate(['/compounds']);
    }
  }
}