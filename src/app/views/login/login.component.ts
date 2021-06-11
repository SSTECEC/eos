import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User)
   {
     console.log('user' , user);
    if (user && user.emailVerified) {
      this.router.navigate(['/farmer/inicio']);
    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  ngOnInit(): void {
  }


  
}
