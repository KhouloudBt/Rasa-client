import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ChatInputComponent implements OnInit {
  @Input() public buttonText = '↩︎';
  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message', {static : true}) message: ElementRef;
    ngOnInit() {
    this.focus.subscribe(() => this.focusMessage());
  }

  public focusMessage() {
    this.message.nativeElement.focus();
  }

  public getMessage() {
    return this.message.nativeElement.value;
  }

  public clearMessage() {
    this.message.nativeElement.value = '';
  }

  onSubmit() {
    const message = this.getMessage();
    if (message.trim() === '') {
      return;
    }
    this.send.emit({ message });
    this.clearMessage();
    this.focusMessage();
  }
}
