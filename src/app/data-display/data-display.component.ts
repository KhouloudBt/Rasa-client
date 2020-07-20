import { ChatService } from './../angular-bot/chat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare var $;


@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
  @ViewChild('dataTable', {static: true}) table;
  dataTable: any;
  data=[];
  temp=false;



// dtOptions: DataTables.Settings = {};
// public empData: Object [] = [];
// public temp = false;
// keys= [];
// values=[]
// constructor(private chatService: ChatService) {}
// async ngOnInit() {
// this.chatService.getShowResult().subscribe(val => this.temp = val);
// this.empData = await this.chatService.getResult();
// this.keys = Object.keys(this.empData[0]);
// for (let object in this.empData){
//  this.values.push(Object.values(this.empData[object]));
// }
// console.log(this.keys);
// console.log(this.values);
// this.temp = true;
// console.log(this.empData);
// this.dtOptions = {
//   pagingType: 'full_numbers',
//   pageLength: 10,
//   dom: 'Bfrtip',
//   buttons: [
//     'copy',
//     'print',
//     'csv',
//     'excel',
//     'pdf']
//   };

// }

public dtOptions: any = {};
constructor( public chatService:ChatService){
}

async ngOnInit() {

  this.chatService.getShowResult().subscribe(val => this.temp = val);
  console.log("hi", this.temp);
  if (this.temp=true)
  {
    this.data = await this.chatService.getResult();
    console.log(this.data)
  }

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    dom: 'Bfrtip',
    buttons: [
      // // { "extend": 'excel', "text":'<i class="btn btn-danger" aria-hidden="true"></i> Excel' },
      'csv',
      'excel',
      'pdfHtml5'
    ]
  };
  this.dataTable = $(this.table.nativeElement);
  this.dataTable.DataTable(this.dtOptions);
}
}



