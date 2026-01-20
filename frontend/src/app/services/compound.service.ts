import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compound, CompoundResponse } from '../models/compound.model';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  private apiUrl = 'http://localhost:3000/api/compounds';

  constructor(private http: HttpClient) { }

  // Get all compounds with pagination
  getCompounds(page: number = 1, limit: number = 10): Observable<CompoundResponse> {
    return this.http.get<CompoundResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  // Get single compound by ID
  getCompoundById(id: number): Observable<CompoundResponse> {
    return this.http.get<CompoundResponse>(`${this.apiUrl}/${id}`);
  }

  // Update compound
  updateCompound(id: number, compound: Partial<Compound>): Observable<CompoundResponse> {
    return this.http.put<CompoundResponse>(`${this.apiUrl}/${id}`, compound);
  }

  // Create new compound
  createCompound(compound: Partial<Compound>): Observable<CompoundResponse> {
    return this.http.post<CompoundResponse>(this.apiUrl, compound);
  }

  // Delete compound
  deleteCompound(id: number): Observable<CompoundResponse> {
    return this.http.delete<CompoundResponse>(`${this.apiUrl}/${id}`);
  }
}