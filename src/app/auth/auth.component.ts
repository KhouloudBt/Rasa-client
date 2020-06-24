import { ChatService } from './../angular-bot/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    username: any;
    password : any;
    error = '';

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private ChatService : ChatService
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['home']);
      // }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.username= this.f.username.value;
      this.password= this.f.password.value

    let logged=  await this.ChatService.authentification(this.f.username.value,this.f.password.value)
    console.log(this.f.password.value);
    console.log(logged);
    if( logged == 'true')
    {

      this.loading=true;
      this.router.navigate(['/home'], { queryParams: { user: this.username} });
    }
    else {console.log('false password');}
        }



}
