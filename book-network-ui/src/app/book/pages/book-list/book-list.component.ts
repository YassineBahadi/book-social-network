import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../services/models';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-book-list',
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  bookResponse:PageResponseBookResponse={};
  page=0;
  size=1;
  message= '';
  level='success'
borrowBook(book: BookResponse) {
  this.message= '';
  this.bookService.borrowBook({
    'book-id':book.id as number
  }).subscribe({
    next:() => {
      this.message='Book successfully added to your list ';
      this.level='success'
    },
    error:(err) => {
      console.log(err);
      this.level='error'
      this.message=err.error.error;
    }
  })
}
goToLastPage() {
  this.page=this.bookResponse.totalPages as number -1;
  this.findAllBooks();
}
goToNextPage() {
  this.page++;
  this.findAllBooks();
}
goToPage(index: number) {
  this.page=index;
  this.findAllBooks();
}
goToPreviousPage() {
  this.page--;
  this.findAllBooks();
}
goToFirstPage() {
  this.page=0;
  this.findAllBooks();
}
  constructor(
    private bookService:BookService,
    private rooter:Router
  ){}
  ngOnInit(): void {
    this.findAllBooks();
  }
  private findAllBooks() {
    this.bookService.findAllBooks({
    page:this.page,
    size:this.size
    }).subscribe({
      next:(books) => {
        this.bookResponse=books;
      }
    })
  }

  get isLastPage():boolean{
    return this.page == this.bookResponse.totalPages as number -1;
  }
}
