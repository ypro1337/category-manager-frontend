import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  @Input() categories: CategoryDto[] = [];
  @Input() isEditMode = false;
  @Input() categoryForm: Partial<CategoryDto> = { name: '' };
  @Output() formSubmitted = new EventEmitter<void>();
  errorMessage: string = '';
  @Output() formCancelled = new EventEmitter<void>();

  constructor(private categoryService: CategoryService) {}

  submitForm(): void {
    if (this.isEditMode) {
      this.categoryService
          .updateCategory(this.categoryForm.id!, this.categoryForm as CategoryDto)
          .subscribe(
              () => this.formSubmitted.emit(),
              (error) => (this.errorMessage = error) // Display API error
          );
    } else {
      this.categoryService.createCategory(this.categoryForm as CategoryDto).subscribe(
          () => this.formSubmitted.emit(),
          (error) => (this.errorMessage = error) // Display API error
      );
    }
  }
}
