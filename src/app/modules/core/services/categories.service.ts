import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Category,
  PostCategory,
  PostCategoryResponse,
} from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = `${environment.apiUrl}/category`;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  postCategory(category: PostCategory): Observable<PostCategoryResponse> {
    return this.http.post<PostCategoryResponse>(this.apiUrl, category, {
      withCredentials: true,
    });
  }
}
