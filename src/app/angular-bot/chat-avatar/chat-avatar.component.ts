import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-avatar',
  templateUrl: './chat-avatar.component.html',
  styleUrls: ['./chat-avatar.component.css']
})
export class ChatAvatarComponent implements OnInit {
  @Input() public image: string;

  constructor() { }

  ngOnInit() {
  }

}
