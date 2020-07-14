import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  Currentuser : any;
  answer: any;
  user: FormControl;
  oldPwd: FormControl;
  newPwd: FormControl;
  confirmPwd: FormControl;
  match: boolean;
  form1: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthService) {
      this.user = new FormControl('', [Validators.required]);
       this.oldPwd = new FormControl('', [Validators.required, this.verifPwd]);
      this.newPwd = new FormControl('',[Validators.required]);
      this.confirmPwd = new FormControl( '',[Validators.required]);
      this.form1 = new FormGroup({
        user : this.user,
        oldPwd: this.oldPwd,
        newPwd : this.newPwd,
        confirmPwd : this.confirmPwd      }
      );
  }
  ngOnInit(){
    this.authService.getCurrentUser().subscribe(val => this.Currentuser = val);



  }

    matchPwds(): boolean{
    let newPwd2 = this.form1.get('oldPwd');
    let confirmPwd2 = this.form1.get('confirmPwd');
    if (newPwd2.value !== confirmPwd2.value) {
      return false ;
    }
    return true;
  }

  async verifPwd ()
  {

   await this.authService.authentification(this.form1.get('user').value, this.form1.get('newPwd').value).then(val => this.match= (val=='true'));


  }

  async onSubmit(){
    await (this.verifPwd());
    this.submitted = true;
    this.answer = await this.authService.changePassword(this.form1.get('user'), this.form1.get('newPwd'));

  }


}
