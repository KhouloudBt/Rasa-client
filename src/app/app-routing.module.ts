import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthComponent } from './auth/auth.component';
import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { ChatComponent} from './angular-bot/chat/chat.component';
import {AddSynonymsComponent} from './add-synonyms/add-synonyms.component';
import {SwitchComponent} from './switch/switch.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import {NavbarComponent} from './navbar/navbar.component';
import { NotFoundComponent} from './not-found/not-found.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent } from './user/user.component'



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'chat', component: ChatComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'display', component: DataDisplayComponent},
  {path : 'add', component: AddSynonymsComponent},
  {path: 'switch', component: SwitchComponent},
  {path: 'change-pwd', component: ChangePasswordComponent},
  {path: 'nav-bar', component: NavbarComponent},

  {path: '**', component: NotFoundComponent},
  {path: 'admin', component: AdminComponent},
  { path : 'user', component: UserComponent}



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
