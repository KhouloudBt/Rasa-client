import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { syntaxError } from '@angular/compiler';



export class Message {
  constructor(public author: string, public content: string, public date: any) {

  }
}
export class Fields{
  mixed: any;
  tables: any;
  columns: any;
  public constructor(init?: Partial<Fields>) {
    Object.assign(this, init);
}

}
export class Synonym{
 id: number;
 synonym: string;

  public constructor(id: number, synonym: string) {
    this.id = id;
    this.synonym = synonym;
}
}
interface Response {
  recipient_id: string;
  text: string;
}
export class Objet{
  text: string;
}
interface ResponseAction{
  events: Array<Object>;
  responses: Array<Objet>;
}

@Injectable()
export class ChatService {
  constructor( private http: HttpClient) {
  }
  url = 'http://localhost:5005/webhooks/rest/webhook';
  urlIntent = 'http://localhost:5005/conversations/default/trigger_intent';
  urlAction = 'http://localhost:5005/conversations/default/execute';
  urlSlot = ' http://localhost:5005/conversations/default/tracker/events';
  conversation = new Subject<Message[]>();





  async SendSynonyms( fieldTable: any, fieldColumn: any): Promise<Synonym[]> {

    const dataAction = JSON.stringify( {
      "name": "send_synonyms",
      "entities":
        [
          {
              "entity": "fieldTable",
              "value": fieldTable
          },
          {
              "entity": "fieldColumn",
              "value": fieldColumn
          },

      ]});
    let syn_string = '';
    let synonyms: string[] = [];

    let result: Synonym[] = [];


    await this.http.post<any>(this.urlIntent, dataAction).toPromise()
         .then( res => {
           console.log(res);
           console.log(res['messages'][0]);
           syn_string = res['messages'][0]['custom'];
           synonyms = this.list_from_string(syn_string);
           // tslint:disable-next-line: forin
           for (let syn in synonyms) {
             console.log(syn);
             console.log(synonyms[syn]);
             let ObjctSyn = new Synonym(synonyms.indexOf(synonyms[syn]), (synonyms[syn].replace('"', '').trim()))  ;
             result.splice(result.length, 0, ObjctSyn);
           }
    }) ;


    return result;

  }

  list_from_string( custom: string): string[] {
    let start = custom.indexOf("[") + 1;
    let end = custom.indexOf("]")
    let inter = custom.substring(start, end);
    const first = inter.split(",")
    let list_syn : string[] = [];
    // tslint:disable-next-line: forin
    for (let syn in first){
      list_syn.splice(list_syn.length, 0, first[syn].replace('"', ''));
   }
    console.log("list_syn=", list_syn);

    return list_syn;

  }
  async addSynonyms(synonyms: any, fieldTable: any, fieldColumn: any) {

    const dataAction = JSON.stringify( {
      "name": "add_synonyms",
      "entities":
        [
          {
              "entity": "fieldTable",
              "value": fieldTable
          },
          {
              "entity": "fieldColumn",
              "value": fieldColumn
          },
          {
              "entity": "synonyms_list",
              "value": synonyms
          },

      ]});
      // answer = res[0].text)
    let answer = 'synonyms added successfully !';
    try {
         await this.http.post<any>(this.urlIntent, dataAction).toPromise()
         .then( res => {answer = res['messages'][0]['text'];  }) ;
       } catch (err) {
         answer = 'Error while adding synonyms';
       }
    return answer;

  }
  async changePassword(user: any, password: any): Promise<boolean> {

    const dataAction = JSON.stringify( {
      "name": "change_password",
      "entities":
        [
          {
              "entity": "password",
              "value": password
          },
          {
              "entity": "user",
              "value": user
          }

      ]});
    let answer = '';
    await this.http.post<any>(this.urlIntent, dataAction).toPromise()
    .then( res => {answer = res['messages'][0]['text'];}) ;
    if(answer="true" ){return true;}
    else {return false;}
  }


  async authentification(user: any, password): Promise<string>{

    const dataAction = JSON.stringify( {
      "name": "authentification",
      "entities":
        [
          {
              "entity": "password",
              "value": password
          },
          {
              "entity": "user",
              "value": user
          }

      ]});
      // answer = res[0].text)
    let answer = 'synonyms added successfully !';
    try {
         await this.http.post<any>(this.urlIntent, dataAction).toPromise()
         .then( res => {answer = res['messages'][0]['text'];  }) ;
       } catch (err) {
         answer = 'Error trying to authentificate';
       }
    return answer;

  }
  async connectToDatabase(dbusername: any, password: any, dbname: any, dbhost: any, dbdriver: any, dbdialect: any ) {
   const dataToSend = JSON.stringify( {
  "name": "connect_to_database",

  "entities":
    [
      {
          "entity": "dbusername",
          "value": dbusername
      },
      {
          "entity": "dbpassword",
          "value": password
      },
      {
          "entity": "dbhost",
          "value": dbhost
      },
      {
          "entity": "dbdriver",
          "value": dbdriver
      },
      {
          "entity": "dbdialect",
          "value": dbdialect
      },
      {
          "entity": "dbname",
          "value": dbname
      }
  ]
});
// await this.http.post<Response[]>(this.urlIntent, dataToSend).toPromise()
// .then( res => answer = res[0].text);
   let answer = 'I\'m having an issue';
   try {
  await this.http.post<any>(this.urlIntent, dataToSend).toPromise()
  .then( res => console.log(res));
} catch (err) {
  return ' I\'m having an issue'; }
   return answer;
}


async getFields(): Promise<Fields> {
    // tslint:disable-next-line: variable-name
    const dataToSend = JSON.stringify( {

      "name": "action_get_fields",
     });

    let fields: Fields = {
       mixed : null,
       tables: null,
       columns : null
     };

    await this.http.post<any>(this.urlAction, dataToSend).toPromise().then(
      res => { fields = new Fields ({ mixed: res['messages'][0]['custom']['mixed'], tables: res['messages'][0]['custom']['seperate']['tables'],
     columns: res['messages'][0]['custom']['seperate']['columns']});
    });
      // tslint:disable-next-line: quotemark
    return fields;
  }



  async getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg, new Date().getTime());
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', await this.getBotMessage(msg), new Date().getTime());

    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }

 async getBotMessage(question: string) {
  const dataToSend = JSON.stringify({
    recipient_id: 'user',
    message: question
}) ;
  // tslint:disable-next-line: quotemark
  let answer = "I'm having an issue";
  try {
  await this.http.post<Response[]>(this.url, dataToSend).toPromise()
  .then( res => answer = res[0].text)
  ;
} catch (err) {
  return ' I\'m having an issue  ';
}
  return answer;
}
}


