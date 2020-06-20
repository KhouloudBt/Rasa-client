import { async } from '@angular/core/testing';
import { ChatService, Fields, Synonym } from './../angular-bot/chat.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';
import { ConditionalExpr } from '@angular/compiler';
import { Callbacks } from 'jquery';


@Component({
  selector: 'app-add-synonyms',
  templateUrl: './add-synonyms.component.html',
  styleUrls: ['./add-synonyms.component.css']
})


export class AddSynonymsComponent implements OnInit {
  public send = false;
  public tableField: any;
  public columnField: any;
  dataTable: any;
  dtOptions: any;
  tableData = [];
  synonyms: Array<Synonym>;
  // @ViewChild('dataTable', {static: true}) table: { nativeElement: any; };
  submitted = false;
  fields: Fields;
  filePath: any;
  mixed: any;
  seperate: any;
  public columns: any;
  public tables: any;
  public fileinput: string [] = [];

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
    console.log(this.tableField);
    console.log(this.columnField);

    this.FieldsForm.get('fieldTable').valueChanges.subscribe(x => this.columns = this.mixed[x]);
    // this.ChangeSelectTable();

  }

  get f() { return this.FieldsForm.controls; }

//   uploadDocument(file: any) {
//     const fileReader = new FileReader();
//     fileReader.onload = (e) => {
//       console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL");
//       const syn = fileReader.result.toString().split('\n');
//       console.log("result", fileReader.result);
//       console.log(syn);
//     //   let i = 0;
//     // for (let st in syn) {
//     //   console.log("syns",st)
//     //     fileinput[i]=<string>st;
//     //     i=i+1;
//     // };
//       fileReader.readAsText(file);
// }
// }
async clicked()
{
  if ((this.FieldsForm.get('fieldColumn').value === undefined )&&( this.FieldsForm.get('fieldTable').value === undefined))
   {
     alert ("you shoud select a field");
   }
else{
  this.synonyms = (await (this.chatService.SendSynonyms(this.FieldsForm.get('fieldTable').value, this.FieldsForm.get('fieldColumn').value)));
  console.log( "type syn", typeof this.synonyms);
}
}

public Remove( id: number)
{
  this.synonyms.splice(1, id);
  console.log(this.synonyms);

}
// async getDataFromSource() {
//   this.tableData = ((await this.chatService.SendSynonyms(this.tableField, this.columnField)).syn_list);
//   this.dtOptions = {
//       data: this.tableData,
//       columns: [
//         {title: 'synonyms', data: this.tableData}]
//     };

//     this.dataTable = $(this.table.nativeElement);
//     this.dataTable.DataTable(this.dtOptions);
//     console.log("hi");
//   }

   onSubmit() {
    this.submitted = true;
    this.columnField = this.FieldsForm.get('fieldColumn').value;
    this.tableField = this.FieldsForm.get('fieldTable').value;
    // let synonyms_recieved = this.chatService.SendSynonyms(this.tableField, this.columnField);
    // let reader = new FileReader();
    //  reader.onload = (e)=> {
    //     let list_syn =reader.result.toString().trim().split('\n');
    //     for ( let el in list_syn) {
    //       this.fileinput.push(list_syn[el]);
    //       };     }
    //  reader.readAsText(this.filePath);

    // const fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL");
    //   const syn = fileReader.result.toString().split('\n');
    //   console.log("result", fileReader.result);
    //   console.log(syn);
    // //   let i = 0;
    // // for (let st in syn) {
    // //   console.log("syns",st)
    // //     fileinput[i]=<string>st;
    // //     i=i+1;
    // // };
    //   fileReader.readAsText(this.filePath);

    // this.uploadDocument(this.filePath);
    // console.log("fileinput", this.fileinput);
    // const alert = this.chatService.addSynonyms(this.fileinput, table, column);
    // stop here if form is invalid
    // if (this.FieldsForm.invalid) {
    //     return;
    // }
    // // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
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




