import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { __await } from 'tslib';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  answer: any;
  form1: FormGroup;

  constructor(fb: FormBuilder,public authService: AuthService) {
    this.form1 = fb.group({
      'user': ['',Validators.required],
      'oldPwd': ['',Validators.required,this.verifPwd],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    }, {
      validator: this.matchPwds
    });
  }
  ngOnInit(): void {
  }

    matchPwds() {
    let newPwd2 = this.form1.get('oldPwd');
    let confirmPwd2 = this.form1.get('confirmPwd');
    if (newPwd2.value !== confirmPwd2.value) {
      return true ;
    }
    return null;
  }

  async verifPwd()
  {
    return (await this.authService.authentification(this.form1.get('user').value, this.form1.get('newPwd').value) === 'true');
  }

  async onSubmit(){
    this.submitted=true;
    this.answer = await this.authService.changePassword(this.form1.get('user'), this.form1.get('newPwd'));

  }


}
