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
  conversation = new Subject<Message[]>();



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
  return " I'm having an issue  ";
}
  return answer;

}
}


