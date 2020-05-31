import { ChatService } from './../angular-bot/chat.service';
import { Component, OnInit} from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-synonyms',
  templateUrl: './add-synonyms.component.html',
  styleUrls: ['./add-synonyms.component.css']
})


export class AddSynonymsComponent implements OnInit {
  submitted = false;
  data: any;
  FieldsForm = new FormGroup({
    fieldTable : new FormControl('choose table'),
    fieldColumn: new FormControl('choose column'),
    addFile: new FormControl(''),
  });

  selectField = 'choose';
  // seperate = new FillDict();
  // seperate.fill['tables']=[];



  // seperate["tables"] = [];
  // seperate["columns"]=[];


  constructor( public chatService: ChatService) { }

  ngOnInit() {
    this.data = this.chatService.getFields();
    console.log(this.data);
  }
  get f() { return this.FieldsForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.FieldsForm.invalid) {
        return;
    }
    // // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  onReset() {
    this.submitted = false;
    this.FieldsForm.reset();
  }

}
