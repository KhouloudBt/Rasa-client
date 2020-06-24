import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject=  new BehaviorSubject<any>(null);

  urlIntent = 'http://localhost:5005/conversations/default/trigger_intent';

  constructor(private http: HttpClient) { }
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
    let answer = '';
    try {
         await this.http.post<any>(this.urlIntent, dataAction).toPromise()
         .then( res => {answer = res['messages'][0]['text']; }) ;
       } catch (err) {
         answer = 'Error trying to authentificate';
       }
    return answer;

  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
  SetCurrentUser(user: Observable<any>)
  {
    this.currentUserSubject.next(user);
  }



}
