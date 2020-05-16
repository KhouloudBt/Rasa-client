import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Message, ChatService } from '../chat.service';
import { fadeIn, fadeInOut } from '../animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [fadeInOut, fadeIn]
})
export class ChatComponent implements OnInit {
  @ViewChild('bottom', {static: true}) bottom: ElementRef ;
  @Input() public buttonText = '↩︎';
  @Input() public theme: 'blue' | 'grey' | 'red' = 'grey';
  @Input() public botName = 'Bot';
  @Input() public botAvatar = 'https://cdn.dribbble.com/users/275794/screenshots/3128598/gbot_800.png';
  @Input() public userAvatar = 'https://storage.proboards.com/6172192/images/gKhXFw_5W0SD4nwuMev1.png';
  // @Input() public startingMessage: string = 'Hi, how can we help you?'
  @Input() public opened  = true;
  // tslint:disable-next-line: variable-name
  public _visible = false;

  messages: Message[] = [];
  value: string;

  constructor(public chatService: ChatService) {

   }

   public get visible() {
    return this._visible;
  }

  @Input() public set visible(visible) {
    this._visible = visible;
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom();
        this.focusMessage();
      }, 0);
    }
  }

  public focus = new Subject();

  public operator;

  public client;

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView();
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  ngOnInit() {
      this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
      this.client = {
      name: 'Guest User',
      status: 'online',
      avatar: this.userAvatar,
    };

      this.operator  = {
      name: this.botName,
      status: 'online',
      avatar: this.botAvatar,
    };
      if (this.opened) {
      setTimeout(() => this.visible = true, 1000);
    }

  }
  public toggleChat() {
    this.visible = !this.visible;
  }
  sendMessage() {
    // this.scrollToBottom();
    this.chatService.getBotAnswer(this.value);
    this.value = '';

  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage();
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat();
    }
}
}
