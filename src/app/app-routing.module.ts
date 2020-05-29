import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent} from './angular-bot/main/main.component';
import { ChatComponent} from './angular-bot/chat/chat.component';
import {AddSynonymsComponent} from './add-synonyms/add-synonyms.component';
import {SwitchComponent} from './switch/switch.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'main', component: MainComponent},
  {path: 'chat', component: ChatComponent},
  {path : 'add', component: AddSynonymsComponent},
  {path: 'switch', component: SwitchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
