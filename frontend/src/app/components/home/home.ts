import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BookCardComponent } from '../book-card/book-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  // Signals for reactive state
  books = signal<any[]>([]);
  categories = signal<any>({});
  searchQuery = signal<string>('');
  selectedGenre = signal<string>('All');

  // Two-way binding helper (ngModel bridge)
  searchInput: string = '';

  genres: string[] = ['All', 'Fiction', 'Science Fiction', 'Thriller', 'Non-Fiction', 'Self-Help'];

  // Computed values derived from signals
  isSearching = computed(() => this.searchQuery() !== '' || this.selectedGenre() !== 'All');
  hasBestSellers = computed(() => (this.categories()['Best Sellers'] ?? []).length > 0);
  hasEditorsPicks = computed(() => (this.categories()["Editor's Picks"] ?? []).length > 0);
  hasNewArrivals = computed(() => (this.categories()['New Arrivals'] ?? []).length > 0);

  // Getter to avoid complex key syntax in template
  get editorsPicks(): any[] {
    return this.categories()["Editor's Picks"] ?? [];
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks(): void {
    const genre = this.selectedGenre();
    this.apiService.getBooks(genre).subscribe({
      next: (data) => this.books.set(data),
      error: (err) => console.error(err)
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error(err)
    });
  }

  onSearch(): void {
    this.searchQuery.set(this.searchInput.trim());

    if (this.searchQuery() === '') {
      this.loadBooks();
      this.loadCategories();
      return;
    }

    this.apiService.searchBooks(this.searchQuery(), this.selectedGenre()).subscribe({
      next: (data) => {
        this.books.set(data);
        this.categories.set({});
      },
      error: (err) => console.error(err)
    });
  }

  onFilterChange(genre: string): void {
    this.selectedGenre.set(genre);
    if (this.searchQuery() !== '') {
      this.onSearch();
    } else {
      this.loadBooks();
    }
  }
}
