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
  public columnField = "none";
  public newSynonym: any;
  public newlist = [];
  public finalList: any[] = [];
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






  constructor( public chatService: ChatService, private cd: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.fields = await this.chatService.getFields();
    this.mixed = this.fields.mixed;
    this.tables = this.fields.tables;
    this.FieldsForm.get('fieldTable').valueChanges.subscribe(x => this.columns = this.mixed[x], this.synonyms=[]);



  }

  get f() { return this.FieldsForm.controls; }

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

async onSubmit() {
    this.submitted = true;
    if (this.FieldsForm.get('fieldColumn').value != undefined)
    {
      this.columnField = this.FieldsForm.get('fieldColumn').value;
    }




   for (let syn in this.synonyms)
   {
     this.finalList.push(this.synonyms[syn].synonym.trim());
   }
   for (let syn in this.newlist)
   {
     if (this.synonyms.indexOf(this.newlist[syn]) === -1)
     {
       this.finalList.push(this.newlist[syn].trim());
     }

   }
    let answer = await (this.chatService.addSynonyms(this.finalList, this.FieldsForm.get('fieldTable').value,this.columnField));
    console.log(answer);
  }

onReset() {
    this.submitted = false;
    this.FieldsForm.reset();
  }
onFileChange(event) {

   if (event.target.files.length > 0) {
      this.filePath = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newlist = reader.result.toString().trim().split("\n");
        console.log(this.newlist);
    }
    reader.readAsText(this.filePath);

      }

      }
    }




