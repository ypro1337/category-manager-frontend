import { CategoryDto, CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: CategoryDto[] = [];
  isModalOpen = false;
  isEditMode = false;
  categoryForm: Partial<CategoryDto> = { name: '' };

  // Filters
  searchQuery: string = '';
  dateAfter?: string;
  dateBefore?: string;
  root?: boolean;
  descendantsCount?: number;

  // Pagination
  currentPage: number = 0;
  pageSize: number = 10; // Default items per page
  totalCategories: number = 0;

  isLoading: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;

    let params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('size', this.pageSize.toString());

    if (this.searchQuery) params = params.set('search', this.searchQuery);
    if (this.dateAfter) params = params.set('dateAfter', Date.parse(this.dateAfter).toString());
    if (this.dateBefore) params = params.set('dateBefore', Date.parse(this.dateBefore).toString());
    if (this.root !== undefined) params = params.set('root', this.root.toString());
    if (this.descendantsCount !== undefined) params = params.set('descendantsCount', this.descendantsCount.toString());

    console.log('Params sent to API:', params.toString());

    this.categoryService.getAllCategories(
      this.currentPage,
      this.pageSize,
      this.searchQuery,
      this.dateAfter,
      this.dateBefore,
      this.root,
      this.descendantsCount
    ).subscribe(
      (data: CategoryDto[]) => {
        console.log('API Response:', data);
        this.categories = data;
        this.totalCategories = data.length; // Update total categories for pagination
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadCategories();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.dateAfter = undefined;
    this.dateBefore = undefined;
    this.root = undefined;
    this.descendantsCount = undefined;
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page < 0 || page * this.pageSize >= this.totalCategories) {
      return;
    }
    this.currentPage = page;
    this.loadCategories();
  }

  openModal(category?: CategoryDto): void {
    this.isModalOpen = true;
    this.isEditMode = !!category;
    this.categoryForm = category ? { ...category } : { name: '' };
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.categoryForm = { name: '' };
  }
  submitForm(): void {
    if (this.isEditMode) {
      this.categoryService.updateCategory(this.categoryForm.id!, this.categoryForm as CategoryDto).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    } else {
      this.categoryService.createCategory(this.categoryForm as CategoryDto).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.categoryForm = { name: '' };
  }
  updatePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 0;
    this.loadCategories();
  }

  editCategory(category: CategoryDto): void {
    this.isEditMode = true;
    this.categoryForm = { ...category };
    setTimeout(() => {
      const formElement = document.querySelector('#category-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }



  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  protected readonly Math = Math;
}
