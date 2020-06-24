import { AuthComponent } from './auth/auth.component';
import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { ChatComponent} from './angular-bot/chat/chat.component';
import {AddSynonymsComponent} from './add-synonyms/add-synonyms.component';
import {SwitchComponent} from './switch/switch.component';



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'chat', component: ChatComponent},
  {path : 'add', component: AddSynonymsComponent},
  {path: 'switch', component: SwitchComponent},
  {path: 'login', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
