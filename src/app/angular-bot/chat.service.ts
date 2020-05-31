import { Injectable } from '@angular/core';
import {  Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';



export class Message {
  constructor(public author: string, public content: string, public date: any) {

  }
}
interface Response {
  recipient_id: string;
  text: string;
}

@Injectable()
export class ChatService {
  constructor( private http: HttpClient) {
  }
  url = 'http://localhost:5005/webhooks/rest/webhook';
  urlIntent = 'http://localhost:5005/conversations/default/trigger_intent';
  urlAction= "http://localhost:5005/conversations/default/execute"

  conversation = new Subject<Message[]>();


  // http://localhost:5005/conversations/{conversation_id}/trigger_intent


  async connectToDatabase(dbusername: any, password: any, dbname: any, dbhost: any, dbdriver: any, dbdialect: any ) {
   const dataToSend = JSON.stringify( {
  'name': 'action_connect_to_database',

  'entities':
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


async getFields(){
    // tslint:disable-next-line: variable-name
    let dict_answer = {};
    const dataToSend = JSON.stringify( {
      // tslint:disable-next-line: quotemark
      // tslint:disable-next-line: object-literal-key-quotes
      "action_name": "action_get_fields",
     });

    try {
     await this.http.post<any>(this.urlAction, dataToSend).toPromise().then(
      // tslint:disable-next-line: no-string-literal
      res => dict_answer = res['messages'][0]['cusotm']);
     console.log( typeof dict_answer);
     console.log(dict_answer);
    } catch (err) {
      // tslint:disable-next-line: quotemark
      return " error while getting fields";
    }
    return dict_answer;
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


