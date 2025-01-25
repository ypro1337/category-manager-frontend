import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {CategoryFormComponent} from './components/category-form/category-form.component';
import {ViewCategoryComponent} from './components/view-category/view-category.component';


let routes: Routes;
routes = [
  {path: '', component: CategoryListComponent},
  /*{path: 'add-category', component: CategoryFormComponent}, // Add category
  {path: 'edit-category/:id', component: CategoryFormComponent}, // Edit category with ID
  { path: 'view-category/:id', component: ViewCategoryComponent },*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


