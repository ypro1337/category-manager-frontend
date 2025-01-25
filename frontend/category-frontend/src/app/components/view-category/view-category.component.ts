import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDto, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  category: CategoryDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params['id'];
    if (categoryId) {
      this.categoryService.getCategoryById(categoryId).subscribe(
        (data) => (this.category = data),
        (error) => console.error('Error fetching category details:', error)
      );
    }
  }
}
