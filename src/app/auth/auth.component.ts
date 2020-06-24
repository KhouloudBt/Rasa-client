import { AuthService } from './auth.service';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


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
    password: any;
    error = '';

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
      this.authService.SetCurrentUser('None' as unknown as Observable<any>);

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.username = this.f.username.value;
      this.password = this.f.password.value;

      const logged =  await this.authService.authentification(this.f.username.value,this.f.password.value)
      console.log(this.f.password.value);
      console.log(logged);
      if ( logged === 'true') {
      this.loading = true;
      this.authService.SetCurrentUser(this.username as Observable<any>);
      this.router.navigate(['/home']);
    } else {
      alert('login failed'); }
           }




}
