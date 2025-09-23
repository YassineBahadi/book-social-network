import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/services';
import { Router, RouterLink } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../services/models';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-my-books',
  imports: [BookCardComponent, RouterLink],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
editBook(book: BookResponse) {
  this.rooter.navigate(['books','manage',book.id]);
}
shareBook(book: BookResponse) {
  this.bookService.updateShareableStatus({
    'book-id':book.id as number
  }).subscribe({
    next:()=>{
      book.shareable=!book.shareable
    }
  })
}
archiveBook(book: BookResponse) {
  this.bookService.updateArchivedStatus({
    'book-id':book.id as number
  }).subscribe({
    next:()=>{
      book.archived=!book.archived
    }
  })
}
  bookResponse:PageResponseBookResponse={};
  page=0;
  size=1;


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
    this.bookService.findAllBooksByOwner({
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
