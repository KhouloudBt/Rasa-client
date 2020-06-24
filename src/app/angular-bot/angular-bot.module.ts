import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
// import { SendSynonymsComponent } from 'src/app/send-synonyms/send-synonyms.component';






@NgModule({
  declarations: [ChatComponent, ChatAvatarComponent, ChatInputComponent],
  providers: [ChatService],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
  ],
  exports: [ChatAvatarComponent, ChatComponent, ChatInputComponent],
})
export class AngularBotModule { }
