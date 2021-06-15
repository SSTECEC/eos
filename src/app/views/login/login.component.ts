import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loginForm = new FormGroup({email: new FormControl(''), password: new FormControl('')});
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
      this.router.navigate(['/farmer/inicio']);
    } else {
      this.router.navigate(['/farmer/inicio']);
    }
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

    async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.register('david18cas@hotmail.com', 'password');
      console.log('register',user);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
  }


  
}
