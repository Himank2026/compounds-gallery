// src/app/services/compound.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Compound {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface PaginatedResponse {
  data: Compound[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  private apiUrl = 'http://localhost:3000/api/compounds';

  constructor(private http: HttpClient) { }

  // Get paginated compounds
  getCompounds(page: number = 1, limit: number = 10): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  // Get single compound by ID
  getCompoundById(id: number): Observable<Compound> {
    return this.http.get<Compound>(`${this.apiUrl}/${id}`);
  }

  // Create new compound
  createCompound(compound: Partial<Compound>): Observable<any> {
    return this.http.post<any>(this.apiUrl, compound);
  }

  // Update compound
  updateCompound(id: number, compound: Partial<Compound>): Observable<Compound> {
    return this.http.put<Compound>(`${this.apiUrl}/${id}`, compound);
  }

  // Delete compound
  deleteCompound(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}