import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../services/models';
import { BookService } from '../../../services/services';

@Component({
  selector: 'app-borrowed-book-list',
  imports: [],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{
  constructor(private bookService:BookService){}
  borrowedBooks:PageResponseBorrowedBookResponse={};
  
  page=0;
  size=1;
  ngOnInit(): void {
    this.findAllBorrowedBooks()
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
