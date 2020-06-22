// import { ChatService } from './angular-bot/chat.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AngularBotModule} from './angular-bot/angular-bot.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { AddSynonymsComponent } from './add-synonyms/add-synonyms.component';
import { SwitchComponent } from './switch/switch.component';
import { DataTablesModule } from 'angular-datatables';
import { DataDisplayComponent } from './data-display/data-display.component';
import { SendSynonymsComponent } from './send-synonyms/send-synonyms.component';
import { AuthComponent } from './auth/auth.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddSynonymsComponent,
    SwitchComponent,
    DataDisplayComponent,
    SendSynonymsComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularBotModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
