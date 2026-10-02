import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/services';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../services/models';

@Component({
  selector: 'app-returned-books',
  imports: [],
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit{
  
  ngOnInit(): void {
    this.findAllReturnedBooks()
  }
  constructor(private bookService:BookService){}
  returnedBooks:PageResponseBorrowedBookResponse={};
  page=0;
  size=5;
  message='';
  level='success'
  
  findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page:this.page,
      size:this.size
    }).subscribe({
      next:(resp)=>{
        this.returnedBooks=resp
      }
    })
  }
  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned){
      this.level='error';
      this.message='The book is not yet returned';
      return;

    }
    this.bookService.approveReturnBorrowBook({
      'book-id':book.id as number
    }).subscribe({
      next:()=>{
        this.level='success';
        this.message='Book return approved';
        this.findAllReturnedBooks();
      }
    })
  }
  
goToLastPage() {
  this.page=this.returnedBooks.totalPages as number -1;
  this.findAllReturnedBooks();
}
goToNextPage() {
  this.page++;
  this.findAllReturnedBooks();
}
goToPage(index: number) {
  this.page=index;
  this.findAllReturnedBooks();
}
goToPreviousPage() {
  this.page--;
  this.findAllReturnedBooks();
}
goToFirstPage() {
  this.page=0;
  this.findAllReturnedBooks();
}
  get isLastPage():boolean{
    return this.page == this.returnedBooks.totalPages as number -1;
  }
}
