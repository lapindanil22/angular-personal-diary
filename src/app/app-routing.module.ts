import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { DiaryComponent } from "./components/diary/diary.component";
import { AddNoteComponent } from "./components/add-note/add-note.component";
import { EditNoteComponent } from "./components/edit-note/edit-note.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'diary', component: DiaryComponent, canActivate: [AuthGuard]},
  { path: 'diary/add', component: AddNoteComponent, canActivate: [AuthGuard]},
  { path: 'diary/edit/:id', component: EditNoteComponent, canActivate: [AuthGuard]},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
