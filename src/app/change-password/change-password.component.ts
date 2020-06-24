import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form1: FormGroup;

  constructor(fb: FormBuilder) {
    this.form1 = fb.group({
      'oldPwd': ['',Validators.required,OldPwdValidators.shouldBe1234],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    }, {
      validator: this..matchPwds
    });
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  get oldPwd() {
    return this.form1.get('oldPwd');
  }

   get newPwd() {
    return this.form1.get('newPwd');
  }

   get confirmPwd() {
    return this.form1.get('confirmPwd');
  }
   matchPwds() {
    let newPwd2 = this.form1.get('oldPwd');
    let confirmPwd2 = this.
    if (newPwd2.value !== confirmPwd2.value) {
      return { pwdsDontMatch: true };
    }
    return null;
  }

}
