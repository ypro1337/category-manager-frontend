import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, CategoryDto } from '../../services/category.service';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">{{ error }}</div>
    <div *ngIf="!loading && !error && category">
      <h2>Category Details</h2>
      <p>Name: {{ category.name }}</p>
      <p>Created At: {{ category.createdAt }}</p>
      <p>Parent ID: {{ category.parentId }}</p>
      <p>Children: {{ category.childrenIds?.join(', ') || 'None' }}</p>
    </div>
  `,
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent {
  category: CategoryDto | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.category = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load category details';
        console.error(err);
        this.loading = false;
      },
    });
  }
}
