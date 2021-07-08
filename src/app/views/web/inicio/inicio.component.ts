import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var $: any
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  modal = 0;

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

  public abrirModalEOS() {

    console.log(!"datos")

    $('#modalEOS').modal('show');

  }

}
