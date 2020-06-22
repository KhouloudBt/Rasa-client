import { ChatService } from './../angular-bot/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  f: FormGroup;
  submitted: boolean;
  dbusername: FormControl;
  dbpassword: FormControl ;
  dbname: FormControl;
  dbdriver: FormControl;
  dbdialect: FormControl;
  dbhost: FormControl;
  constructor( private chatSerivce: ChatService, private formBuilder: FormBuilder) {

    this.dbusername = new FormControl('', [Validators.required]);
    this.dbname = new FormControl('', [Validators.required]);
    this.dbpassword = new FormControl('', [Validators.required]);
    this.dbdialect = new FormControl('', [Validators.required]);
    this.dbhost = new FormControl('', [Validators.required]);
    this.dbdriver = new FormControl('', [Validators.required]);
    this.submitted = false;
    this.f = formBuilder.group({
    dbusername: this.dbusername,
    dbdialect: this.dbdialect,
    dbdriver: this.dbdriver,
    dbhost: this.dbhost,
    dbname: this.dbname,
    dbpassword: this.dbpassword,
});

  }


  async onSubmit() {
    this.dbusername = this.f.get('dbusername').value;
    this.dbname = this.f.get('dbname').value;
    this.dbpassword = this.f.get('dbpassword').value;
    this.dbdriver = this.f.get('dbdriver').value;
    this.dbdialect = this.f.get('dbdialect').value;
    this.dbhost = this.f.get('dbhost').value;
    this.submitted = true;
    const answer = await this.chatSerivce.connectToDatabase(this.dbusername, this.dbpassword,
       this.dbname, this.dbhost, this.dbdriver, this.dbdialect);
    console.log(answer);



  }
  ngOnInit() {
  }


  }

