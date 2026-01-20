export interface Compound {
  id: number;
  name: string;
  image: string;
  description: string;
  image_attribution?: string;
  date_modified?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompoundResponse {
  success: boolean;
  data: Compound | Compound[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message?: string;
}
