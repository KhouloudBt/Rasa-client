import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {ChatService,Synonyms} from '../../app/angular-bot/chat.service';
@Component({
  selector: 'app-send-synonyms',
  templateUrl: './send-synonyms.component.html',
  styleUrls: ['./send-synonyms.component.css']
})
export class SendSynonymsComponent implements OnInit {
  @Input() tableField: string;
  @Input() columnField: string;
  @Input() send: boolean;

  // @Input() send:boolean;
  // @Input() submit: Boolean;
  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('dataTable', {static: true}) table;
  synonyms: any[];
  answer: any;

  constructor( private chatService: ChatService) { }


   async getDataFromSource() {
    this.tableData = ((await this.chatService.SendSynonyms(this.tableField, this.columnField)).syn_list);
    this.dtOptions = {
        data: this.tableData,
        columns: [
          {title: 'synonyms', data: this.synonyms}]
      };

      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
      console.log("hi");
    };

  async ngOnInit() {
    // console.log(this.send);
    // if (this.send == true)
    // {
    // }
    console.log(this.send);
    await this.getDataFromSource();

  //  this.synonyms = (await this.chatService.SendSynonyms(this.tableField, this.column)).syn_list;
  //  if (this.submit === true) {
  //   this.answer = await this.chatService.addSynonyms(this.synonyms, this.table, this.column, 'w');
  //   }

  }

}
