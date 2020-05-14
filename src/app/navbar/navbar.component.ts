import { Component, OnInit } from '@angular/core';
declare var jQuery: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.navbar-nav .nav-item .nav-link').on('click', function(){
      $('.navbar-nav').find('.active').removeClass('active');
      $(this).addClass('active');
   });
  }

}
