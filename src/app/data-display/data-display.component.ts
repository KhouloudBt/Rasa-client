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
  products=[{id:  "1", price:"1500", name:"TOSHIBA", category:"pc" },
{id:  "2", price:"2000", name:"Hwawei Mediapad", category:"phone" },
{id:  "3", price:"2550", name:"ASUS 1500", category:"pc" },
{id:  "4", price:"500", name:"Samsung ", category:"tablet" },
{id:  "5", price:"975", name:"Logicom La Tab Link 71P ", category:"phone" },
{id:  "6", price:"2600", name:"Lenovo 1600", category:"pc" },
{id:  "7", price:"700", name:"IKU T47", category:"tablet" },
{id:  "8", price:"850", name:"Logimcom Latab", category:"phone" },
{id:  "9", price:"965", name:"Samsung A50", category:"phone" },
{id:  "10", price:"1750", name:"HP", category:"pc" }]



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
constructor(){
}

ngOnInit(): void {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    dom: 'Bfrtip',
    buttons: [
      // // { "extend": 'excel', "text":'<i class="btn btn-danger" aria-hidden="true"></i> Excel' },
      'csv',
      'excel',
      'pdf'
    ]
  };
  this.dataTable = $(this.table.nativeElement);
  this.dataTable.DataTable(this.dtOptions);
}
}



