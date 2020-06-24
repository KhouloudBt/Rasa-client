import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:string ;
  sub: any;

  constructor(  private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(val => this.user = val);
  }

}
