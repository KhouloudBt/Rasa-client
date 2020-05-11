import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';


export class Message {
  constructor(public author: string, public content: string) {}
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


  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));

    // setTimeout(() => {
    //   this.conversation.next([botMessage]);
    // }, 1500);
  }

  getBotMessage(question: string) {
    // let answer = this.messageMap[question];
    // return answer || this.messageMap['default'];
    // tslint:disable-next-line: prefer-const
    let dataToSend = JSON.stringify({
      recipient_id: 'user',
      message: question
  }) ;
    let answer = 'error';
    let resp : Response;

    this.http.post(this.url, dataToSend).subscribe(data => resp = {
      recipient_id: (data as any).recipient_id,
      text:  (data as any).text,
    });

    return resp.text;

}



}
