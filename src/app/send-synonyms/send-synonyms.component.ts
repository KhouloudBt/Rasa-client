import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import {ChatService,Synonym} from '../../app/angular-bot/chat.service';
@Component({
  selector: 'app-send-synonyms',
  templateUrl: './send-synonyms.component.html',
  styleUrls: ['./send-synonyms.component.css']
})
export class SendSynonymsComponent implements OnInit{
  private _tableField: string;
  private _columnField: string;
  private _send: boolean;
  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('dataTable', {static: true}) table;
  synonyms: any[];
  answer: any;

  // @Input() send:boolean;
  // @Input() submit: Boolean;

  @Input() set tableField (value: string) {
    this._tableField = value;
  }

  get tableField(): string {
    return this._tableField;
  }
  @Input() set columnField(value: string) {
    this._columnField = value;
  }

  get columnField(): string {
    return this._columnField;
  }
  @Input() set send(value: boolean) {
    this._send = value;
  }

  get send(): boolean {
    return this._send;
  }

  constructor( private chatService: ChatService) { }

  //  async getDataFromSource() {
  //   this.tableData = ((await this.chatService.SendSynonyms(this.tableField, this.columnField));
  //   this.dtOptions = {
  //       data: this.tableData,
  //       columns: [
  //         {title: 'synonyms', data: this.synonyms}]
  //     };

  //     this.dataTable = $(this.table.nativeElement);
  //     this.dataTable.DataTable(this.dtOptions);
  //     console.log("hi");
  //   }

  async ngOnInit() {
      // await this.getDataFromSource();



  //  this.synonyms = (await this.chatService.SendSynonyms(this.tableField, this.column)).syn_list;
  //  if (this.submit === true) {
  //   this.answer = await this.chatService.addSynonyms(this.synonyms, this.table, this.column, 'w');
  //   }

  }

}
