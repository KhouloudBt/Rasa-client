import { AuthService } from './../auth/auth.service';
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

  answer : any;
  user : any; //the current user
  public send = false;
  public tableField: any;
  public columnField = "none";
  fieldmissing : boolean = false; //=user hasn't selected a field
  public newSynonym: any;
  public newlist = [];
  public finalList: any[] = []; //the filnal list of synonyms: file union table of synonyms
  synonyms: Synonym[] = [];
  public toEditSyn: Synonym = new Synonym(-1, " "); //the synonym that the user wants to edit
  submitted = false;
  fields: Fields;
  filePath: any;
  mixed: any; //the list of tables and columns recieved from the server
  seperate: any; //the list of tables and columns recieved from the server arranged seperately
  public columns: any;
  public tables: any;
  public fileinput: string [] = [];
  FieldsForm = new FormGroup({
    fieldTable : new FormControl(),
    fieldColumn: new FormControl(),
    addFile: new FormControl(),
  });


  constructor( private chatService: ChatService, private cd: ChangeDetectorRef, private formBuilder: FormBuilder, private authService: AuthService) { }

  async ngOnInit() {
    //get the current user
    this.authService.getCurrentUser().subscribe(val => this.user = val);
    //getting the fields of the database  from server
    this.fields = await this.chatService.getFields();
    this.mixed = this.fields.mixed;
    this.tables = this.fields.tables;
    // when user selects a table, the second select would be filled with columns relative to that table and reset to all list of syns
    this.FieldsForm.get('fieldTable').valueChanges.subscribe(x => {this.columns = this.mixed[x], this.synonyms = [];
                                                                   this.newlist = []; this.finalList = []; });
    }

  get f() { return this.FieldsForm.controls; }
// return an Object Syn given its id
public  findByIndex ( id: number): Synonym{
   for (let syn of this.synonyms)
   {
     if (syn.id === id){return syn ;}
   }
}
//adds a new synonym to the list
public AddSynonym()
{
  const newSyn = new Synonym(((this.synonyms.length ) + 1 ), this.newSynonym);
  this.synonyms.push(newSyn);
}

async clicked()
{
  if ((this.FieldsForm.get('fieldColumn').value === undefined) && ( this.FieldsForm.get('fieldTable').value === undefined))
   {
this.fieldmissing=true;
   }
   //getting the list of synonyms relative to the table/column selected
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
// to remove a synonym object from the list
public Remove( syn: Synonym)
{
  this.synonyms = this.synonyms.filter(item => item.id !== syn.id);
}

public SetToEditSyn(syn : Synonym)
{ this.toEditSyn = syn; } // sets the given syn as the syn to edit

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
    this.answer = await (this.chatService.addSynonyms(this.finalList, this.FieldsForm.get('fieldTable').value,this.columnField));

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
      verifField()
      {
        if ((this.FieldsForm.get('fieldColumn').value === undefined) && ( this.FieldsForm.get('fieldTable').value === undefined))
        {
      this.fieldmissing=true;
        }
      }
    }




