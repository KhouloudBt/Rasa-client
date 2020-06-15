import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';



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
              "value": ["hi"]
          }
      ]});
      // answer = res[0].text)
    let answer = 'synonyms added successfully !';
    try {
         await this.http.post<any>(this.urlIntent, dataAction).toPromise()
         .then( res => console.log(res)) ;
       } catch (err) {
         answer = 'Error while adding synonyms';
       }
    return answer;

  }
  async connectToDatabase(dbusername: any, password: any, dbname: any, dbhost: any, dbdriver: any, dbdialect: any ) {
   const dataToSend = JSON.stringify( {
  "name": "action_connect_db",

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
   let answer = 'I\'m having an issue';
   try {
  await this.http.post<Response[]>(this.urlAction, dataToSend).toPromise()
  .then( res => answer = res[0].text);
} catch (err) {
  return ' I\'m having an issue';
}
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
      res => { fields = new Fields ({ mixed: res['messages'][0]['custom']['mixed'],tables: res['messages'][0]['custom']['seperate']['tables'],
     columns: res['messages'][0]['custom']['seperate']['columns']}); });
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


