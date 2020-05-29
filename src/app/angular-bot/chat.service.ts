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
  conversation = new Subject<Message[]>();


  // http://localhost:5005/conversations/{conversation_id}/trigger_intent


  async connectToDatabase(username: any, password: any, dbname: any, dbhost: any, dbdriver: any, dbdialect: any ) {
   const dataToSend = JSON.stringify( {
  'name': 'connect_to_databse',
  'entities': {
  'dbusername': username,
  'password': password,
  'dbhost': dbhost,
  'dbdriver': dbdriver,
  'dbdialect': dbdialect,
  'dbname': dbname
  }
});
   let answer = 'I\'m having an issue';
   try {
  await this.http.post<Response[]>(this.urlIntent, dataToSend).toPromise()
  .then( res => answer = res[0].text);
} catch (err) {
  return ' I\'m having an issue';
}
   return answer;
}


getFields(fieldTable: string, fieldColumn: string, filepath: string): any {

    const dataToSend = JSON.stringify( {
      'name': 'get_fields',
      'entities': {
      'fieldTable': fieldTable,
      'fieldColumn': fieldColumn,
      'fielPath': filepath
      }
    });


    return this.http.post<any>(this.urlIntent, dataToSend).toPromise();
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


