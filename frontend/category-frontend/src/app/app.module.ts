import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AppRoutingModule } from './app-routing.module';
import {provideHttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {CategoryFormComponent} from './components/category-form/category-form.component';
import {ViewCategoryComponent} from './components/view-category/view-category.component';

@NgModule({
  declarations: [AppComponent,
    NavbarComponent,
    CategoryFormComponent,
    CategoryListComponent,
    ViewCategoryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}

