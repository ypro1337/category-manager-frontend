import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CategoryDto {
  id: number;
  name: string;
  createdAt: string;
  parentId?: number;
  childrenIds?: number[];
  root: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getAllCategories(
    page: number = 0,
    size: number = 10,
    search?: string,
    dateAfter?: string,
    dateBefore?: string,
    root?: boolean,
    descendantsCount?: number
  ): Observable<CategoryDto[]> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (search) params = params.set('search', search);
    if (dateAfter) params = params.set('dateAfter', dateAfter);
    if (dateBefore) params = params.set('dateBefore', dateBefore);
    if (root !== undefined) params = params.set('root', root.toString());
    if (descendantsCount !== undefined) params = params.set('descendantsCount', descendantsCount.toString());

    return this.http.get<CategoryDto[]>(this.baseUrl, { params });
  }

  // Fetch a single category by ID
  getCategoryById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Create a new category
  /*createCategory(category: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(this.baseUrl, category).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Update an existing category
  updateCategory(id: number, category: CategoryDto): Observable<CategoryDto> {
    return this.http.put<CategoryDto>(`${this.baseUrl}/${id}`, category).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Delete a category
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }*/

  // Handle API errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error?.message) {
      // Server-side error with custom message
      errorMessage = `Error: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
