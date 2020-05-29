import { ChatService } from './../angular-bot/chat.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-synonyms',
  templateUrl: './add-synonyms.component.html',
  styleUrls: ['./add-synonyms.component.css']
})
export class AddSynonymsComponent implements OnInit {
  registerForm: FormGroup;
  validationTooltip04 = 'validationTooltip04';
  submitted = false;
  data: any;
  fieldTable: string;
  fieldColumn: string;
  filePath: string;
  selectField = 'choose';

  constructor(private formBuilder: FormBuilder, public chatService: ChatService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      field: ['', Validators.required],
      addFile : [Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  });

    this.data = JSON.parse(this.chatService.getFields(this.fieldTable, this.fieldColumn, this.filePath));
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
