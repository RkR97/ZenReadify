import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-details.html',
  styleUrls: ['./book-details.css']
})
export class BookDetailsComponent implements OnInit {
  book: any = null;
  reviews: any[] = [];
  activeTab: 'description' | 'reviews' = 'description';
  newReview = { user: '', rating: 5, comment: '' };

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.loadBook(id);
        this.loadReviews(id);
      }
    });
  }

  loadBook(id: string): void {
    this.apiService.getBookById(id).subscribe({
      next: (data) => this.book = data,
      error: (err) => console.error(err)
    });
  }

  loadReviews(id: string): void {
    this.apiService.getReviews(id).subscribe({
      next: (data) => this.reviews = data,
      error: (err) => console.error(err)
    });
  }

  submitReview(): void {
    if(!this.newReview.user || !this.newReview.comment) return;
    this.apiService.addReview(this.book._id, this.newReview).subscribe({
      next: (data) => {
        this.reviews.unshift(data);
        this.newReview = { user: '', rating: 5, comment: '' };
      },
      error: (err) => console.error(err)
    });
  }
}
