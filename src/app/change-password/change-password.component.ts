import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  answer: any;
  user : FormControl;
  oldPwd : FormControl;
  newPwd: FormControl;
  confirmPwd: FormControl;
  form1: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthService) {
      this.user = new FormControl('', [Validators.required]);
       this.oldPwd = new FormControl('', [Validators.required, this.verifPwd]);
      this.newPwd = new FormControl('',[Validators.required]);
      this.confirmPwd = new FormControl( '',[Validators.required]);
      this.form1 = this.fb.group({
        user : this.user,
        oldPwd: this.oldPwd,
        newPwd : this.newPwd,
        confirmPwd : this.confirmPwd
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
