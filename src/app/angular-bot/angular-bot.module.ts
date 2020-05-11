import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './main/main.component';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatComponent, MainComponent],
  providers: [ChatService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AngularBotModule { }
