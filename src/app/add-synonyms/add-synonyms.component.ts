import { ChatService, Fields } from './../angular-bot/chat.service';
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-synonyms',
  templateUrl: './add-synonyms.component.html',
  styleUrls: ['./add-synonyms.component.css']
})


export class AddSynonymsComponent implements OnInit {
  submitted = false;
  fields: Fields;
  fielPath: any;
  mixed: any;
  seperate: any;
  public columns: any;
  public tables: any;
  table: any;
  column: any;
  FieldsForm = new FormGroup({
    fieldTable : new FormControl('choose table'),
    fieldColumn: new FormControl('choose column'),
    addFile: new FormControl(),
  });

  // seperate = new FillDict();
  // seperate.fill['tables']=[];



  // seperate["tables"] = [];
  // seperate["columns"]=[];


  constructor( public chatService: ChatService, private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.fields = await this.chatService.getFields();
    this.mixed = this.fields.mixed;
    this.tables = this.fields.tables;
    console.log(this.tables);
    console.log(this.columns);
    this.FieldsForm.get('fieldTable').valueChanges.subscribe(x => this.columns = this.mixed[x]);
    // this.ChangeSelectTable();

  }

  get f() { return this.FieldsForm.controls; }
  async onSubmit() {
    this.submitted = true;
    // const filePath = this.FieldsForm.get('filePath').value;
    const fieldColumn = this.FieldsForm.get('fieldColumn').value;
    const fieldTable = this.FieldsForm.get('fieldTable').value;
    const alert = await this.chatService.addSynonyms(this.fielPath, fieldTable, fieldColumn);
    console.log(alert);
    // stop here if form is invalid
    // if (this.FieldsForm.invalid) {
    //     return;
    // }
    // // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    console.log(this.FieldsForm.value);
  }
  onReset() {
    this.submitted = false;
    this.FieldsForm.reset();
  }
  onFileChange(event) {

    if (event.target.files.length > 0)
    {
      this.fielPath = event.target.files[0];
      // this.FieldsForm.get('addFile').setValue(this.fielPath, {emitModelToViewChange: true});
    }
      }
    }



