import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
redirectToLogin() {
  this.router.navigate(['login']);
}
onCodeCompleted(token: string) {
  this.confirmAccount(token);
}
  confirmAccount(token: string) {
   this.authService.confirm ({
    token
   }).subscribe({
    next:() => {
      this.message='Your account has been activated successfully.\n You can now log in.';
      this.submitted=true;
      this.isOkay=true;
    },
    error:() => {
      this.message='Token has been expired';
      this.submitted=true;
      this.isOkay=false;
    }
   })
  }
  message:string='';
  isOkay:boolean=true;
  submitted:boolean=false;

  constructor(private router:Router,private authService:AuthenticationService){}
}
