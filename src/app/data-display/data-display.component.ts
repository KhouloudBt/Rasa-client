import { ChatService } from './../angular-bot/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
dtOptions: DataTables.Settings = {};
public empData: Object [] = [];
public temp = false;
keys= [];
values=[]
constructor(private chatService: ChatService) {}
async ngOnInit() {
this.chatService.getShowResult().subscribe(val => this.temp = val);
this.empData = await this.chatService.getResult();
this.keys = Object.keys(this.empData[0]);
for (let object in this.empData){
 this.values.push(Object.values(this.empData[object]));
}
console.log(this.keys);
console.log(this.values);
this.temp = true;
console.log(this.empData);
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  dom: 'Bfrtip',
  buttons: [
    'copy',
    'print',
    'csv',
    'excel',
    'pdf']
  };

}
}

