import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getBooks(genre?: string): Observable<any[]> {
    let params = new HttpParams();
    if (genre && genre !== 'All') params = params.set('genre', genre);
    return this.http.get<any[]>(`${this.baseUrl}/books`, { params });
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/books/${id}`);
  }

  searchBooks(q: string, genre?: string): Observable<any[]> {
    let params = new HttpParams().set('q', q);
    if (genre && genre !== 'All') params = params.set('genre', genre);
    return this.http.get<any[]>(`${this.baseUrl}/search`, { params });
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  getReviews(bookId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews/${bookId}`);
  }

  addReview(bookId: string, review: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reviews/${bookId}`, review);
  }
}
