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
  filePath: any;
  mixed: any;
  seperate: any;
  public columns: any;
  public tables: any;
  fileinput: Array<string>;
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

    this.FieldsForm.get('fieldTable').valueChanges.subscribe(x => this.columns = this.mixed[x]);
    // this.ChangeSelectTable();

  }

  get f() { return this.FieldsForm.controls; }
  uploadDocument(file: any) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
    let syn = fileReader.result.toString().split('\n');
    console.log(fileReader.result.toString().split('\n'));
    console.log(syn);
    let i = 0;
    for (const st in syn) {
        this.fileinput[i]=st;
        i=i+1;
    };
    fileReader.readAsText(file);
}
}
  async onSubmit() {
    this.submitted = true;
    const column = this.FieldsForm.get('fieldColumn').value;
    const table = this.FieldsForm.get('fieldTable').value;
    this.uploadDocument(this.filePath);
    console.log("fileinput", this.fileinput);
    const alert = await this.chatService.addSynonyms(this.fileinput, table, column);
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

    if (event.target.files.length > 0) {
      this.filePath = event.target.files[0];
    }
      }
    }




