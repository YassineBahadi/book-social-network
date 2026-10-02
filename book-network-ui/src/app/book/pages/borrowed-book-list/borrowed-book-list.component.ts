import { FeedbackRequest } from './../../../services/models/feedback-request';
import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../services/models';
import { BookService, FeedBackService } from '../../../services/services';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from "../../components/rating/rating.component";
@Component({
  selector: 'app-borrowed-book-list',
  imports: [FormsModule, RatingComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

  constructor(private bookService:BookService,private feedbackService:FeedBackService){}
  borrowedBooks:PageResponseBorrowedBookResponse={};
  feedbackRequest:FeedbackRequest={
    bookId: 0,
    comment: '',
    note:0
  };
  selectedBook:BorrowedBookResponse | undefined =undefined;
  page=0;
  size=1;
  ngOnInit(): void {
    this.findAllBorrowedBooks()
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id':this.selectedBook?.id as number
    }).subscribe({
      next:()=>{
        if(withFeedback){
          this.giveFeedback()
        }
        this.selectedBook=undefined
        this.findAllBorrowedBooks()

      }
        
    })
}
  giveFeedback() {
    this.feedbackService.saveFeedback({
      body:this.feedbackRequest
    }).subscribe({
      next:()=>{

      }
    })
  }

  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page:this.page,
      size:this.size
    }).subscribe({
      next:(resp)=>{
        this.borrowedBooks=resp
      }
    })
  }
returnBorrowedBook(book: BorrowedBookResponse) {
  this.selectedBook=book;
  this.feedbackRequest.bookId=book.id as number
}
goToLastPage() {
  this.page=this.borrowedBooks.totalPages as number -1;
  this.findAllBorrowedBooks();
}
goToNextPage() {
  this.page++;
  this.findAllBorrowedBooks();
}
goToPage(index: number) {
  this.page=index;
  this.findAllBorrowedBooks();
}
goToPreviousPage() {
  this.page--;
  this.findAllBorrowedBooks();
}
goToFirstPage() {
  this.page=0;
  this.findAllBorrowedBooks();
}
  get isLastPage():boolean{
    return this.page == this.borrowedBooks.totalPages as number -1;
  }
}
