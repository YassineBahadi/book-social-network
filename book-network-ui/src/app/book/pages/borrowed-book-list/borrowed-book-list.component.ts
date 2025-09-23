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
  page=0;
  size=5;
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
  borrowedBooks:PageResponseBorrowedBookResponse={};
}
