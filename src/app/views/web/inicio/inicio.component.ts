import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

}
