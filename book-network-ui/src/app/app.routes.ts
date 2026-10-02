import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { MainComponent } from './book/pages/main/main.component';
import { BookListComponent } from './book/pages/book-list/book-list.component';
import { MyBooksComponent } from './book/pages/my-books/my-books.component';
import { ManageBookComponent } from './book/pages/manage-book/manage-book.component';
import { BorrowedBookListComponent } from './book/pages/borrowed-book-list/borrowed-book-list.component';
import { ReturnedBooksComponent } from './book/pages/returned-books/returned-books.component';
import { authGuard } from './services/guard/auth.guard';

export const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"activate-account",component:ActivateAccountComponent},
  {path:"books",component:MainComponent,canActivate : [authGuard] ,children:[
    {
      path:"",
      component:BookListComponent
    },
    {
      path:"my-books",
      component:MyBooksComponent,
      canActivate:[authGuard]
    },
    {
      path:"manage",
      component:ManageBookComponent,
      canActivate:[authGuard]
    },
    {
      path:"manage/:bookId",
      component:ManageBookComponent,
      canActivate:[authGuard]
    },
    {
      path:"my-borrowed-books",
      component:BorrowedBookListComponent,
      canActivate:[authGuard]
    }
    ,{
      path:"my-returned-books",
      component:ReturnedBooksComponent,
      canActivate:[authGuard]
    }
  ]
},
  
];
