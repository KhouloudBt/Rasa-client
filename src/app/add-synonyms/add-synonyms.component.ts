import { async } from '@angular/core/testing';
import { ChatService, Fields, Synonym } from './../angular-bot/chat.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import {  FormGroup, FormControl, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-add-synonyms',
  templateUrl: './add-synonyms.component.html',
  styleUrls: ['./add-synonyms.component.css']
})


export class AddSynonymsComponent implements OnInit {
  @ViewChild('Addmodal', {static: false}) Addmodal: ElementRef;
  @ViewChild('Editmodal', {static: false}) Editmodal: ElementRef;


  public send = false;
  public tableField: any;
  public columnField: any;
  public newSynonym: any;
  public newlist: Synonym[] = [];
  dataTable: any;
  dtOptions: any;
  tableData = [];
  synonyms: Synonym[] = [];
  public toEditSyn: Synonym = new Synonym(-1, " ");
  submitted = false;
  fields: Fields;
  filePath: any;
  mixed: any;
  seperate: any;
  public columns: any;
  public tables: any;
  public fileinput: string [] = [];
  FieldsForm = new FormGroup({
    fieldTable : new FormControl(),
    fieldColumn: new FormControl(),
    addFile: new FormControl(),
  });
  params = {offset: 0, limit: 10};
  itemCount = 0;
  items = [];



  // seperate = new FillDict();
  // seperate.fill['tables']=[];



  // seperate["tables"] = [];
  // seperate["columns"]=[];


  constructor( public chatService: ChatService, private cd: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.fields = await this.chatService.getFields();
    this.mixed = this.fields.mixed;
    this.tables = this.fields.tables;
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

public  findByIndex ( id: number): Synonym{
   for (let syn of this.synonyms)
   {
     if (syn.id === id){return syn ;}
   }
}

public AddSynonym()
{
  const newSyn = new Synonym(((this.synonyms.length ) + 1 ), this.newSynonym);
  this.synonyms.push(newSyn);
}

async clicked()
{
  if ((this.FieldsForm.get('fieldColumn').value === undefined) && ( this.FieldsForm.get('fieldTable').value === undefined))
   {
     alert ("you shoud select a field");
   }
else{
  this.synonyms = (await (this.chatService.SendSynonyms(this.FieldsForm.get('fieldTable').value, this.FieldsForm.get('fieldColumn').value)));

}
}
public EditSynonym()
{
console.log (this.toEditSyn);
console.log( this.findByIndex(this.toEditSyn.id));
console.log(this.synonyms);

}
public Remove( syn: Synonym)
{
  this.synonyms = this.synonyms.filter(item => item.id !== syn.id);
}

public SetToEditSyn(syn : Synonym)
{ this.toEditSyn = syn; }

public onSubmit() {
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




